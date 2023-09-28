import { Input, NumberInput, NumberInputField, Textarea } from '@chakra-ui/react';
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { useState } from 'react';

function EventManager() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [startTime, setStartTime] = useState({h: 0, m: 0});
    const [endDate, setEndDate] = useState(new Date());
    const [endTime, setEndTime] = useState({h: 0, m: 0});

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
            <>
                <NumberInput min={0} max={23} onChange={(value) => setStartTime(startTime => ({ ...startTime, h: value }))}>
                    <NumberInputField placeholder='Hora'>
                    </NumberInputField>
                </NumberInput>
                <NumberInput min={0} max={59} onChange={(value) => setStartTime(startTime => ({ ...startTime, m: value }))}>
                    <NumberInputField placeholder='Minutos'>
                    </NumberInputField>
                </NumberInput>
            </>
        </>
    );
}

export default EventManager;