from flask import Blueprint, request, jsonify
from app import db
from app.models.order import Order, OrderItem
from app.models.product import Product
from app.models.merchandise import Merchandise
from flask_jwt_extended import jwt_required, get_jwt_identity
import os
from paystackapi.paystack import Paystack

order_bp = Blueprint('order_bp', __name__)

paystack = Paystack(secret_key=os.environ.get('PAYSTACK_SECRET_KEY'))

@order_bp.route('/orders', methods=['POST'])
@jwt_required()
def create_order():
    user_identity = get_jwt_identity()
    user_id = user_identity['id']
    data = request.get_json()
    items = data.get('items') # Expected format: [{'type': 'product'/'merchandise', 'id': 1, 'quantity': 2}]

    if not items:
        return jsonify({'message': 'Cart is empty'}), 400

    total_price = 0
    order_items = []

    for item_data in items:
        item = None
        if item_data['type'] == 'product':
            item = Product.query.get(item_data['id'])
        elif item_data['type'] == 'merchandise':
            item = Merchandise.query.get(item_data['id'])

        if item is None or item.stock < item_data['quantity']:
            return jsonify({'message': f'Item {item.name if item else "ID " + str(item_data["id"])} is out of stock or invalid'}), 400
        
        price = item.price * item_data['quantity']
        total_price += price
        item.stock -= item_data['quantity'] # Decrease stock

        order_items.append(OrderItem(
            product_id=item.id if item_data['type'] == 'product' else None,
            merchandise_id=item.id if item_data['type'] == 'merchandise' else None,
            quantity=item_data['quantity'],
            price=item.price
        ))

    new_order = Order(user_id=user_id, total_price=total_price, items=order_items)
    db.session.add(new_order)
    db.session.commit()

    # Initiate Paystack transaction
    try:
        transaction = paystack.transaction.initialize(
            amount=int(total_price * 100),  # Paystack amount is in kobo
            email=get_jwt_identity()['email'], # You need to add email to identity or fetch user
            reference=f"order_{new_order.id}_{user_id}",
            callback_url=f"{os.environ.get('FRONTEND_URL')}/payment/callback"
        )
        new_order.paystack_reference = transaction['data']['reference']
        db.session.commit()
        return jsonify(transaction), 200
    except Exception as e:
        return jsonify({'message': f'Payment initiation failed: {str(e)}'}), 500

@order_bp.route('/paystack/webhook', methods=['POST'])
def paystack_webhook():
    # Handle payment verification from Paystack here
    # This requires more complex logic to verify the request signature
    # and update the order status in the database.
    return jsonify({'status': 'success'}), 200
