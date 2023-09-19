import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import EventMapper from '../../util/EventMapper';
import './Event.css'

function Event() {
    const { eventId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [event, setEvent] = useState({});

    useEffect(() => {
        // Request the event information from the server
        fetch(`https://6508c2b556db83a34d9cb031.mockapi.io/api/event/Event/${eventId}`)
            .then(response => response.json())
            .then(data => {
                // Update the state with the fetched data
                setEvent(data);
            })
            .catch(error => {
                // Handle any error that occurs during the request
                console.error(error);
            })
            .finally(() => {
                // Finish the loading screen
                setIsLoading(false);
            })
    }, [eventId]);

    function redirectTo(url) {
        window.location.replace(url);
    }

    return (
        <>
            {
            isLoading ? <p>Loading...</p> : 
            <div className='event-window'>
                <p className='event-window-message'>Agrega {event.title} a tu calendario favorito</p>
                <button className='event-window-button' onClick={() => redirectTo(EventMapper.toOutlookEventURL(event))}>
                    Calendario de Outlook
                </button>
                <button className='event-window-button' onClick={() => redirectTo(EventMapper.toGoogleEventURL(event))}>
                    Calendario de Google
                </button>
                <button className='event-window-button'>
                    {
                        /iPhone/i.test(navigator.userAgent) ? 'Calendario de Apple' : 'Otro calendario'
                    }
                </button>
            </div>
            }
        </>
    )
}

export default Event
