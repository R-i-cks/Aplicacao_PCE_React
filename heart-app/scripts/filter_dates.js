const axios = require('axios');

async function fetchAndFilterOldEntries(thresholdDays) {
    try {
        
        const response = await axios.get("http://localhost:5001/api/registos");
        const entries = response.data;
        console.log('Fetched Entries:', JSON.stringify(entries, null, 2));

        if (!Array.isArray(entries)) {
            throw new Error('Expected an array of entries');
        }
        const currentDate = new Date();
        const thresholdMilliseconds = thresholdDays * 24 * 60 * 60 * 1000;
        const filteredEntries = entries.filter(entry => {
            let entryDate;
            if (typeof entry.date_t === 'string') {
                entryDate = new Date(entry.date_t);
            } else if (entry.date_t && entry.date_t.$date) {
                entryDate = new Date(entry.date_t.$date);
            } else {
                console.warn('Entry without date:', entry);
                return false;
            }
            const timeDifference = currentDate - entryDate;
            return timeDifference <= thresholdMilliseconds;
        });

        return filteredEntries;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}


module.exports = fetchAndFilterOldEntries;