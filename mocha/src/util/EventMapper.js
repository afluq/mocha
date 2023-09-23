import * as moment from 'moment-timezone';

const timezone = 'America/Mexico_City';

/**
 * Replaces certain characters in a URL string with their URL-encoded equivalents.
 *
 * @param {string} url - The URL string to be URL-encoded.
 * @return {string} The URL string with the specified characters replaced by their URL-encoded equivalents.
 */
function toURLCode(url) {
    return url.replace(/:+/g, '%3A').replace(/\++/g, '%2B');
}

/**
 * Calculates the time difference between the current UTC time and a given timezone.
 *
 * @param {string} timezone - The timezone to calculate the difference with.
 * @return {string} The time difference in the format "HH:00".
 */
function getUTCTimeDiff(timezone) {
    const currentUTC = moment.utc();
    const currentTZ = moment.tz(timezone);
    const diff = currentUTC.diff(currentTZ, 'hours');
    const isNegative = diff < 0;
    const absNumber = Math.abs(diff);
    const paddedString = absNumber < 10 ? `0${absNumber}` : absNumber.toString();
    const resultString = isNegative ? '-' + paddedString : paddedString;
    return resultString;
}

/**
 * Generates a Google Event URL from a generic event
 * @param {object} event 
 * @returns {string} Google Event URL as String, use it to redirect the user to their calendar 
 */
function toGoogleEventURL(event) {
    const url = 'https://www.google.com/calendar/';
    // Days and hours stored in Mexico City Timezone
    const startingDate = `${event.startDate}T${event.startHour}Z`.replace(/:+/g, '').replace(/-/g, ''); 
    const endingDate = `${event.endDate}T${event.endHour}Z`.replace(/:+/g, '').replace(/-/g, ''); 
    const eventURI = `render?action=TEMPLATE` 
            + `&title=${event.title}`
            + `&text=${event.title}`
            + `&details=${event.description}`
            + `&location=${event.location}`
            + `&dates=${startingDate}/${endingDate}`
            + `&ctz=${timezone}`;
    return url + toURLCode(eventURI);
}

/**
 * Generates a Microsoft Outlook Event URL from a generic event
 * @param {object} event 
 * @returns {string} Outlook Event URL as String, use it to redirect the user to their calendar 
 */
function toOutlookEventURL(event) {
    const url = 'https://outlook.live.com/calendar/0/action/'
    const startingDate = moment(`${event.startDate}T${event.startHour}`).format('YYYY-MM-DDTHH:mm:ss');
    const endingDate = moment(`${event.endDate}T${event.endHour}`).format('YYYY-MM-DDTHH:mm:ss');	
    const eventURI = `compose?allday=false` 
            + `&enddt=${endingDate}${getUTCTimeDiff(timezone)}`
            + `&startdt=${startingDate}${getUTCTimeDiff(timezone)}`
            + `&body=${event.description}`
            + `&subject=${event.title}` 
            + `&location=${event.location}`
            + `&path=%2Fcalendar%2Faction%2Fcompose`
            + `&rru=addevent`;
    return url + toURLCode(eventURI);
}

function toICSFile(event) {
    const startingDate = `${event.startDate}T${event.startHour}`.replace(/:+/g, '').replace(/-/g, ''); 
    const endingDate = `${event.endDate}T${event.endHour}`.replace(/:+/g, '').replace(/-/g, ''); 
    const ics = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
DTSTART:${startingDate}
DTEND:${endingDate}
END:VEVENT
END:VCALENDAR`;

    return new Blob([ics], {type: 'text/calendar'});
}

export default { toGoogleEventURL, toOutlookEventURL, toICSFile };
