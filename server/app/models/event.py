from app import db
from datetime import datetime

class Event(db.Model):
    __tablename__ = 'events'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=True)
    date = db.Column(db.DateTime, nullable=False)
    location = db.Column(db.String(200), nullable=False)
    ticket_price = db.Column(db.Float, nullable=False)
    tickets_available = db.Column(db.Integer, nullable=False)
    image_url = db.Column(db.String(255), nullable=True)

    tickets = db.relationship('Ticket', backref='event', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'date': self.date.isoformat(),
            'location': self.location,
            'ticket_price': self.ticket_price,
            'tickets_available': self.tickets_available,
            'image_url': self.image_url
        }
