import { Input, NumberInput, NumberInputField, Textarea } from '@chakra-ui/react';
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { useState } from 'react';

function EventManager() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [startTime, setStartTime] = useState({h: 0, m: 0});
    const [endingDate, setEndingDate] = useState(new Date());
    const [endingTime, setEndingTime] = useState({h: 0, m: 0});

    function handleTitleChange(e) {
        setTitle(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }
    
    function handleLocationChange(e) {
        setLocation(e.target.value);
    }

    

    return (
        <>
            <Input placeholder='Evento' onChange={handleTitleChange} />
            <Input placeholder='Ubicación' onChange={handleLocationChange} />
            <Textarea resize='none' placeholder='Descripción' onChange={handleDescriptionChange}></Textarea>
            <SingleDatepicker
                name="start-date-input"
                date={startDate}
                onDateChange={setStartDate}
            />
            <NumberInput min={0} max={23} onChange={(value) => setStartTime(startTime => ({ ...startTime, h: value }))}>
                <NumberInputField>
                </NumberInputField>
            </NumberInput>
            <NumberInput min={0} max={59} onChange={(value) => setStartTime(startTime => ({ ...startTime, m: value }))}>
                <NumberInputField>
                </NumberInputField>
            </NumberInput>
            <SingleDatepicker
                name="ending-date-input"
                date={endingDate}
                onDateChange={setEndingDate}
            />
        </>
    );
}

export default EventManager;