from app import db
from datetime import datetime

class Order(db.Model):
    __tablename__ = 'orders'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    total_price = db.Column(db.Float, nullable=False)
    # order_type indicates the primary intent: 'store' (liquor), 'merchandise', 'event', or 'mixed'
    order_type = db.Column(db.String(30), nullable=False, default='store')
    status = db.Column(db.String(50), nullable=False, default='pending') # pending, paid, shipped, delivered
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    paystack_reference = db.Column(db.String(100), unique=True, nullable=True)
    
    items = db.relationship('OrderItem', backref='order', lazy=True, cascade="all, delete-orphan")
    # optional shipping address - only used when shipping is required
    shipping_address = db.relationship('ShippingAddress', uselist=False, backref='order', cascade="all, delete-orphan")

    def requires_shipping(self):
        """Return True if any item in the order requires shipping (store/merchandise)."""
        return any(item.item_type in ('product', 'merchandise') for item in self.items)

    def items_by_type(self, type_name):
        """Return list of items filtered by item_type."""
        return [item for item in self.items if item.item_type == type_name]

class OrderItem(db.Model):
    __tablename__ = 'order_items'
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=True)
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'), nullable=True)
    merchandise_id = db.Column(db.Integer, db.ForeignKey('merchandise.id'), nullable=True)
    # item_type indicates the source/type of this item: 'product', 'merchandise', 'event'
    item_type = db.Column(db.String(30), nullable=False, default='product')
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False) # Price at the time of purchase

    # convenience relationships (SQLAlchemy will pick the correct FK)
    product = db.relationship('Product', lazy=True)
    merchandise = db.relationship('Merchandise', lazy=True)
    event = db.relationship('Event', lazy=True)

    @property
    def item(self):
        """Return the associated object based on item_type."""
        if self.item_type == 'product':
            return self.product
        if self.item_type == 'merchandise':
            return self.merchandise
        if self.item_type == 'event':
            return self.event
        return None


class ShippingAddress(db.Model):
    __tablename__ = 'shipping_addresses'
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'), nullable=False)
    recipient_name = db.Column(db.String(200), nullable=False)
    phone = db.Column(db.String(50), nullable=True)
    address_line1 = db.Column(db.String(255), nullable=False)
    address_line2 = db.Column(db.String(255), nullable=True)
    city = db.Column(db.String(100), nullable=False)
    state = db.Column(db.String(100), nullable=True)
    postal_code = db.Column(db.String(50), nullable=True)
    country = db.Column(db.String(100), nullable=True)
    pinned_location = db.Column(db.String(255), nullable=True) 



