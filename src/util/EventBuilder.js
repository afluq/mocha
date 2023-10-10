/**
 * Converts the string of a date in format 'YYYY-MM-DDTHH:MM' to a tuple of strings['YYYYMMDD', 'HHMMSS']
 * @param {string} date 
 */
export function formatDate(date) {
    const cleanDate = date.replace(/[-:]/g, '');
    const [date_, time_] = cleanDate.split('T');
    return [date_, time_ + '00'];
}

export function toDate(date, time) {
    const year = date.substr(0, 4);
    const month = date.substr(4, 2);
    const day = date.substr(6, 2);
    const hour = time.substr(0, 2);
    const min = time.substr(2, 2);
    const secs = time.substr(4, 2);

    return hour + ':' + min  + ':' + secs  + ' | ' + day + '/' + month + '/' + year;
}