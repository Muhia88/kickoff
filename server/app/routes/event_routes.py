from flask import Blueprint, jsonify, request
from app.models.event import Event
from app import db
from flask_jwt_extended import jwt_required, get_jwt_identity

event_bp = Blueprint('event_bp', __name__)

def is_admin():
    identity = get_jwt_identity()
    return identity and identity.get('role') == 'admin'

@event_bp.route('/events', methods=['GET'])
def get_events():
    events = Event.query.all()
    return jsonify([event.to_dict() for event in events])

@event_bp.route('/events/<int:id>', methods=['GET'])
def get_event(id):
    event = Event.query.get_or_404(id)
    return jsonify(event.to_dict())

@event_bp.route('/events', methods=['POST'])
@jwt_required()
def create_event():
    if not is_admin():
        return jsonify({'message': 'Admins only!'}), 403
    data = request.get_json()
    new_event = Event(**data)
    db.session.add(new_event)
    db.session.commit()
    return jsonify(new_event.to_dict()), 201
    
# Add PUT and DELETE routes similar to products for admin
