from app import db
import uuid

class Ticket(db.Model):
    __tablename__ = 'tickets'
    id = db.Column(db.Integer, primary_key=True)
    ticket_uid = db.Column(db.String(36), unique=True, nullable=False, default=lambda: str(uuid.uuid4()))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'), nullable=False)
    order_item_id = db.Column(db.Integer, db.ForeignKey('order_items.id'), nullable=True)
    qr_code_url = db.Column(db.String(255), nullable=True)
    is_used = db.Column(db.Boolean, default=False)
    paystack_reference = db.Column(db.String(100), unique=True, nullable=True)

    order_item = db.relationship('OrderItem', backref='tickets')

    def to_dict(self):
        return {
            'ticket_uid': self.ticket_uid,
            'event_name': self.event.name,
            'event_date': self.event.date.isoformat(),
            'owner_email': self.owner.email,
            'qr_code_url': self.qr_code_url,
            'is_used': self.is_used
        }
