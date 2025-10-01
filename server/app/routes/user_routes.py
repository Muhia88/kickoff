from flask import Blueprint, jsonify, request
from app.models.user import User
from app import db

user_bp = Blueprint('user_bp', __name__)


@user_bp.route('/', methods=['GET'])
def list_users():
    users = User.query.all()
    return jsonify([{'id': u.id, 'username': u.username, 'email': u.email} for u in users])


@user_bp.route('/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get_or_404(user_id)
    return jsonify({'id': user.id, 'username': user.username, 'email': user.email})
