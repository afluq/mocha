import { Card, CardBody, Text, Heading, Button } from '@chakra-ui/react'
import { LinkIcon } from '@chakra-ui/icons';
import { toDate } from '../../util/EventBuilder';

function EventCard({ event }) {
    async function copyToClipboard(text) {
        if ('clipboard' in navigator) {
            return await navigator.clipboard.writeText(text);
        } else {
            return document.execCommand('copy', true, text); // For old browsers
        }
    }

    function getTitle(text) {
        if (text.length <= 22) {
            return text;
        }
        const shortTitle = text.slice(0, 22);
        return shortTitle + '...';
    }

    return (
        <Card variant={'elevated'} style={{width: 'fit-content'}}>
            <CardBody>
                <Heading size={'md'}>
                    {getTitle(event.title) + ' '}
                    <Button onClick={() => copyToClipboard(window.location.href + event.id)}>
                        <LinkIcon />
                    </Button>
                </Heading>
                <Text>{"📌 " + event.location}</Text>
                <Text>
                    {"📅 " + toDate(event.startDate, event.startTime) + " - " + toDate(event.endDate, event.endTime)}
                </Text>
            </CardBody>
        </Card>
    );
}

export default EventCard;