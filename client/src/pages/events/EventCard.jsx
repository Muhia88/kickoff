import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Tag } from 'lucide-react';

const EventCard = ({ event }) => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
        <div className="relative">
            <img className="w-full h-56 object-cover" src={event.image} alt={event.name} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-4">
                <h2 className="text-2xl font-playfair font-bold text-white">{event.name}</h2>
            </div>
        </div>
        <div className="p-6 flex-grow flex flex-col">
            <div className="flex items-center text-gray-600 mb-2">
                <Calendar className="w-5 h-5 mr-2 text-red-600" />
                <span className="text-sm font-medium">{event.date}</span>
            </div>
            <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="w-5 h-5 mr-2 text-red-600" />
                <span className="text-sm font-medium">{event.location}</span>
            </div>
            <p className="text-gray-700 text-sm flex-grow">{event.description.substring(0, 100)}...</p>
            <div className="mt-6 flex justify-between items-center">
                <p className="text-xl font-bold text-gray-900 flex items-center">
                    <Tag className="w-5 h-5 mr-2 text-green-500" />
                    ${event.price.toFixed(2)}
                </p>
                <Link
                    to={`/events/${event.id}`}
                    className="bg-red-700 text-white font-bold py-2 px-4 rounded-md hover:bg-red-800 transition-colors duration-300 text-sm"
                >
                    View Details
                </Link>
            </div>
        </div>
    </div>
);

export default EventCard;
