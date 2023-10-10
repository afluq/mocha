import {
    Input, Textarea, Text, Heading, Button, 
    Stack, Card, CardBody, CardHeader, 
} from '@chakra-ui/react';
import {formatDate} from '../../util/EventBuilder';
import { useState } from 'react';

function NewEvent() {
    const [isLoading, setIsLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [startDateTime, setStartDateTime] = useState('');
    const [endDateTime, setEndDateTime] = useState('');

    async function submitNewEvent() {
        const [startDate, startTime] = formatDate(startDateTime);
        const [endDate, endTime] = formatDate(endDateTime);

        const event = {
            title: title,
            description: description,
            location: location,
            startDate: startDate,
            startTime: startTime,
            endDate: endDate,
            endTime: endTime,
        }

        await fetch(`https://localhost:7248/api/event/new`, { 
            method: 'POST',
            mode: 'cors',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(event)})
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(() => {
                setError(true);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    function handleTitleChange(e) {
        setTitle(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleLocationChange(e) {
        setLocation(e.target.value);
    }
    
    function handleStartDateTime(e) {
        setStartDateTime(e.target.value);
    }

    function handleEndDateTime(e) {
        setEndDateTime(e.target.value);
    }

    return (
        <>
            <div className='event-manager'>
                <Card variant={'elevated'}>
                    <CardHeader>
                        <Heading size='md'>Nuevo evento</Heading>
                    </CardHeader>
                    <CardBody>
                        <Stack direction={'column'} spacing={'10px'} align={'stretch'}>
                            <Stack direction={'row'} spacing={'10px'} align={'center'}>
                                <Text style={{width: '110px'}}>Título</Text>
                                <Input onChange={handleTitleChange} />
                            </Stack>
                            <Stack direction={'row'} spacing={'10px'} align={'center'}>
                                <Text style={{width: '110px'}}>Ubicación</Text>
                                <Input onChange={handleLocationChange} />
                            </Stack>
                            <Stack direction={'row'} spacing={'10px'} align={'center'}>
                                <Text style={{width: '110px'}}>Descripción</Text>
                                <Textarea resize='none' onChange={handleDescriptionChange}></Textarea>
                            </Stack>
                            <Stack direction={'row'} spacing={'10px'} align={'center'}>
                                <Text style={{width: '110px'}}>Inicio</Text>
                                <Input
                                    placeholder="Selecciona dia y fecha"
                                    size="md"
                                    type="datetime-local"
                                    onChange={handleStartDateTime}
                                />
                            </Stack>
                            <Stack direction={'row'} spacing={'10px'} align={'center'}>
                                <Text style={{width: '110px'}}>Termino</Text>
                                <Input
                                    placeholder="Selecciona dia y fecha"
                                    size="md"
                                    type="datetime-local"
                                    onChange={handleEndDateTime}
                                />
                            </Stack>
                            <Button colorScheme='blue' onClick={async () => await submitNewEvent()}>Crear evento</Button>
                        </Stack>
                    </CardBody>
                </Card>
            </div>
        </>
    );
}

export default NewEvent;