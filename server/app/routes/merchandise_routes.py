from flask import Blueprint, jsonify, request
from app.models.merchandise import Merchandise
from app import db
from flask_jwt_extended import jwt_required, get_jwt_identity

merchandise_bp = Blueprint('merchandise_bp', __name__)

# These routes would be very similar to the product routes
# GET all, GET one, POST, PUT, DELETE
@merchandise_bp.route('/merchandise', methods=['GET'])
def get_all_merchandise():
    items = Merchandise.query.all()
    return jsonify([item.to_dict() for item in items]), 200

# Add other CRUD routes for admin...
