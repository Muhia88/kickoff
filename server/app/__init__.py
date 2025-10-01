import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from config import config

db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()

def create_app(config_name='default'):
    """
    Application factory function.
    """
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_object(config[config_name])

    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    CORS(app)

    with app.app_context():
        # This single import loads all your models cleanly through the models/__init__.py file.
        from . import models

        # Import blueprints after models are loaded
        from .routes.auth_routes import auth_bp
        from .routes.product_routes import product_bp
        from .routes.event_routes import event_bp
        from .routes.order_routes import order_bp
        from .routes.ticket_routes import ticket_bp
        from .routes.merchandise_routes import merchandise_bp
        from .routes.user_routes import user_bp

        # Register blueprints
        # Auth stays under /api/auth
        app.register_blueprint(auth_bp, url_prefix='/api/auth')
        # Resource blueprints expose routes like '/products', '/events', etc.
        # Register them under a shared '/api' prefix so their internal
        # routes become '/api/products', '/api/events', etc.
        app.register_blueprint(product_bp, url_prefix='/api')
        app.register_blueprint(event_bp, url_prefix='/api')
        app.register_blueprint(order_bp, url_prefix='/api')
        app.register_blueprint(ticket_bp, url_prefix='/api')
        app.register_blueprint(merchandise_bp, url_prefix='/api')
        app.register_blueprint(user_bp, url_prefix='/api')

    return app