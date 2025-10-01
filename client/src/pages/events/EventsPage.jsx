import React from 'react';
import EventCard from '../../components/events/EventCard';
import { events } from '../../data/events';

const EventsPage = () => {
    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-playfair font-bold text-gray-900">Upcoming Events</h1>
                    <p className="mt-4 text-lg text-gray-600">Join us for exclusive tastings, parties, and more.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {events.map(event => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EventsPage;
