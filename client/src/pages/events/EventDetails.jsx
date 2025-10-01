import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { Tag } from 'lucide-react';
import { events } from '../../data/events';
import { UseCart } from '../../contexts/CartContext';

const CartItemType = { TICKET: 'TICKET' };

const EventDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = UseCart();
    const event = events.find(e => e.id === id);

    if (!event) {
        return <div className="text-center py-20">Event not found.</div>;
    }

    const handleBuyTicket = () => {
        addToCart({
            id: `${CartItemType.TICKET}-${event.id}`,
            name: `Ticket: ${event.name}`,
            price: event.price,
            image: event.image,
            quantity: 1,
            type: CartItemType.TICKET
        });
        navigate('/checkout');
    };

    return (
        <div className="bg-white">
            <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    <div>
                        <img src={event.image} alt={event.name} className="w-full rounded-lg shadow-2xl object-cover aspect-[4/3]" />
                    </div>
                    <div className="space-y-6">
                        <h1 className="text-4xl lg:text-5xl font-playfair font-bold text-gray-900">{event.name}</h1>
                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-gray-600">
                            <div className="flex items-center">
                                <Calendar className="w-5 h-5 mr-2 text-red-600" />
                                <span className="font-medium">{event.date}</span>
                            </div>
                            <div className="flex items-center">
                                <Clock className="w-5 h-5 mr-2 text-red-600" />
                                <span className="font-medium">7:00 PM onwards</span>
                            </div>
                        </div>
                        <div className="flex items-center text-gray-600">
                            <MapPin className="w-5 h-5 mr-2 text-red-600" />
                            <span className="font-medium">{event.location}</span>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{event.description}</p>
                        <div className="bg-gray-100 p-6 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div>
                                <p className="text-sm text-gray-600">Ticket Price</p>
                                <p className="text-3xl font-bold text-gray-900">KSh {event.price.toLocaleString()}</p>
                            </div>
                            <button
                                onClick={handleBuyTicket}
                                className="w-full sm:w-auto bg-red-700 text-white font-bold py-3 px-8 rounded-lg hover:bg-red-800 transition-transform transform hover:scale-105"
                            >
                                Buy Ticket
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetails;
