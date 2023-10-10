import { Spinner, ScaleFade, SimpleGrid } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import NewEvent from '../../components/NewEvent/NewEvent';
import './EventManager.css';
import EventCard from '../../components/EventCard/EventCard';

function EventManager() {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const ownerId = 0;

    useEffect(() => {
        fetch(`https://localhost:7248/api/event/group/owner/${ownerId}`, { mode: 'cors' })
            .then(response => response.json())
            .then(data => {
                setEvents(data);
            })
            .catch(() => {
                setError(true);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [ownerId]);

    function displayEvents() {
        const eventsLists = events.map(e => <EventCard event={e} key={e.id} />);
        return eventsLists;
    }

    return (
        <>
            {
                isLoading ?
                    <div className='event-manager-message'>
                        <Spinner thickness='6px' speed='0.44s' emptyColor='gray.200' color='blue.200' size='xl' />
                    </div> :
                    <ScaleFade in={!isLoading} initialScale={0.8}>
                        <div className='event-manager-container'>
                            <div className='event-manager-my-events'>
                                <SimpleGrid columns={3}>
                                    {displayEvents()}
                                </SimpleGrid>
                            </div>
                            <div className='event-manager-new'>
                                <NewEvent />
                            </div>
                        </div>
                    </ScaleFade>
            }
        </>
    );
}

export default EventManager;