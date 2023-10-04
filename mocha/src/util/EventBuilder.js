/**
 * Converts the string of a date in format 'YYYY-MM-DDTHH:MM' to a tuple of strings['YYYYMMDD', 'HHMMSS']
 * @param {string} date 
 */
export default function formatDate(date) {
    const cleanDate = date.replace(/[-:]/g, '');
    const [date_, time_] = cleanDate.split('T');
    return [date_, time_ + '00'];
}
