from flask import Blueprint, jsonify, request
from app.models.product import Product, Category
from app import db
from flask_jwt_extended import jwt_required, get_jwt_identity

product_bp = Blueprint('product_bp', __name__)

def is_admin():
    identity = get_jwt_identity()
    return identity and identity.get('role') == 'admin'

# Category Routes
@product_bp.route('/categories', methods=['GET'])
def get_categories():
    categories = Category.query.all()
    return jsonify([category.to_dict() for category in categories]), 200

@product_bp.route('/categories', methods=['POST'])
@jwt_required()
def create_category():
    if not is_admin():
        return jsonify({'message': 'Admins only!'}), 403
    data = request.get_json()
    new_category = Category(name=data['name'])
    db.session.add(new_category)
    db.session.commit()
    return jsonify(new_category.to_dict()), 201

# Product Routes
@product_bp.route('/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([product.to_dict() for product in products]), 200

@product_bp.route('/products/<int:id>', methods=['GET'])
def get_product(id):
    product = Product.query.get_or_404(id)
    return jsonify(product.to_dict()), 200

@product_bp.route('/products', methods=['POST'])
@jwt_required()
def create_product():
    if not is_admin():
        return jsonify({'message': 'Admins only!'}), 403
    data = request.get_json()
    new_product = Product(**data)
    db.session.add(new_product)
    db.session.commit()
    return jsonify(new_product.to_dict()), 201

@product_bp.route('/products/<int:id>', methods=['PUT'])
@jwt_required()
def update_product(id):
    if not is_admin():
        return jsonify({'message': 'Admins only!'}), 403
    product = Product.query.get_or_404(id)
    data = request.get_json()
    for key, value in data.items():
        setattr(product, key, value)
    db.session.commit()
    return jsonify(product.to_dict()), 200

@product_bp.route('/products/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_product(id):
    if not is_admin():
        return jsonify({'message': 'Admins only!'}), 403
    product = Product.query.get_or_404(id)
    db.session.delete(product)
    db.session.commit()
    return jsonify({'message': 'Product deleted'}), 200
