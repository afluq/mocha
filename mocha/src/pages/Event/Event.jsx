import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { Button, Stack, Spinner, ScaleFade, Text, Heading } from '@chakra-ui/react'
import EventMapper from '../../util/EventMapper';
import './Event.css'

function Event() {
    const { eventId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(undefined);
    const [event, setEvent] = useState({});

    useEffect(() => {
        // Request the event information from the server
        fetch(`https://127.0.0.1:7248/api/event/${eventId}`, {mode: 'cors'})
            .then(response => response.json())
            .then(data => {
                // Update the state with the fetched data
                setEvent(data);
            })
            .catch(() => {
                // Handle any error that occurs during the request
                setError(true);
            })
            .finally(() => {
                // Finish the loading screen
                setIsLoading(false);
            });
    }, [eventId]);

    function redirectTo(url) {
        window.location.replace(url);
    }

    function downloadFile(blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Evento ${event.title}.ics`;
        a.click();
    }

    return (
        <div className='event-window'>
            {
                isLoading ?
                    <Spinner thickness='6px' speed='0.44s' emptyColor='gray.200' color='blue.200' size='xl' /> :
                    error ? <Text fontSize={'xl'} color={'red.500'}>Hubo un error y no se pudo encontrar este evento</Text> :
                        <ScaleFade in={!isLoading} initialScale={0.8}>
                            <div className='event-window-text'>
                                <Heading size={'lg'}>{event.title}</Heading>
                                <Text fontSize='md' noOfLines={1}>Agrega este evento a tu calendario favorito</Text>
                            </div>
                            <Stack direction='column' spacing='2'>
                                <Button size='md' onClick={() => redirectTo(EventMapper.toOutlookEventURL(event))}>
                                    Calendario de Outlook
                                </Button>
                                <Button size='md' onClick={() => redirectTo(EventMapper.toGoogleEventURL(event))}>
                                    Calendario de Google
                                </Button>
                                <Button size='md' onClick={() => downloadFile(EventMapper.toICSFile(event))}>
                                    {
                                        /iPhone/i.test(navigator.userAgent) ? 'Calendario de Apple' : 'Otro calendario'
                                    }
                                </Button>
                            </Stack>
                        </ScaleFade>
            }
        </div>
    )
}

export default Event
