from flask import Blueprint, request, jsonify
from app import db
from app.models.event import Event
from app.models.ticket import Ticket
from flask_jwt_extended import jwt_required, get_jwt_identity
import os
import qrcode
from io import BytesIO
import base64

ticket_bp = Blueprint('ticket_bp', __name__)

# Note: Payment logic can be integrated here similarly to orders
@ticket_bp.route('/events/<int:event_id>/buy-ticket', methods=['POST'])
@jwt_required()
def buy_ticket(event_id):
    user_identity = get_jwt_identity()
    event = Event.query.get_or_404(event_id)

    if event.tickets_available <= 0:
        return jsonify({'message': 'Sorry, this event is sold out.'}), 400

    # Create a ticket first, then handle payment
    new_ticket = Ticket(user_id=user_identity['id'], event_id=event_id)
    event.tickets_available -= 1
    
    db.session.add(new_ticket)
    db.session.commit()

    # Generate QR Code
    qr_data = f"{os.environ.get('APP_URL')}/api/tickets/verify/{new_ticket.ticket_uid}"
    
    # In a real app, you'd upload this to a cloud storage (e.g., S3)
    # For now, we'll send it as base64 data
    img = qrcode.make(qr_data)
    buffered = BytesIO()
    img.save(buffered, format="PNG")
    img_str = base64.b64encode(buffered.getvalue()).decode()
    
    new_ticket.qr_code_url = f"data:image/png;base64,{img_str}" # Placeholder
    db.session.commit()
    
    # Here you would integrate payment logic like in orders
    
    return jsonify({
        'message': 'Ticket purchase initiated. Please complete payment.',
        'ticket': new_ticket.to_dict()
    }), 201

@ticket_bp.route('/tickets/verify/<string:ticket_uid>', methods=['POST'])
@jwt_required()
def verify_ticket(ticket_uid):
    if get_jwt_identity().get('role') != 'admin':
        return jsonify({'message': 'Admins only!'}), 403
        
    ticket = Ticket.query.filter_by(ticket_uid=ticket_uid).first_or_404()
    if ticket.is_used:
        return jsonify({'message': 'This ticket has already been used.'}), 400
    
    ticket.is_used = True
    db.session.commit()
    
    return jsonify({
        'message': 'Ticket verified successfully.',
        'ticket': ticket.to_dict()
    }), 200
