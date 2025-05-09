/**
 * Mulligan Masters Golf Group Website
 * Google Sheets Integration for Booked Rounds
 */

document.addEventListener('DOMContentLoaded', function() {
    // Only run this code on the events page
    if (document.getElementById('booked-rounds-table')) {
        fetchBookedRounds();
    }
});

/**
 * Fetches booked rounds data from Google Sheets
 */
function fetchBookedRounds() {
    const spreadsheetId = '1TToyNaNsboS7RTARk06NF08s673M0Jx2NORqvwy0qQI';
    const sheetName = 'Tee Schedule'; // Assuming this is the sheet name
    const range = 'A7:G50'; // Adjust range as needed to capture all relevant data
    
    // Construct the URL for the Google Sheets API
    // This uses the sheets.googleapis.com/v4/spreadsheets endpoint
    // Note: This approach requires the spreadsheet to be publicly accessible or shared with "Anyone with the link"
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}!${range}?key=AIzaSyDfVHVyqAJhZseDLZlM_SCklEmew0FDOTU`;
    
    // Show loading message
    const tableBody = document.querySelector('#booked-rounds-table tbody');
    tableBody.innerHTML = '<tr><td colspan="6" class="text-center">Loading booked rounds...</td></tr>';
    
    // Fetch data from Google Sheets
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayBookedRounds(data.values);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            tableBody.innerHTML = `<tr><td colspan="6" class="text-center text-danger">Error loading data. Please try again later.</td></tr>`;
            
            // Fallback: Display sample data for demonstration
            displaySampleData();
        });
}

/**
 * Displays booked rounds data in the table
 * @param {Array} data - The data from Google Sheets
 */
function displayBookedRounds(data) {
    const tableBody = document.querySelector('#booked-rounds-table tbody');
    
    // Clear the table
    tableBody.innerHTML = '';
    
    // Check if we have data
    if (!data || data.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="6" class="text-center">No booked rounds available.</td></tr>';
        return;
    }
    
    // Filter to only include rows with a DATE value, where STATUS is exactly "Booked", and date is in the future
    const bookedRounds = data.filter(row => {
        // Check if we have a date and status is exactly "Booked"
        if (!(row[0] && row[0].trim() !== 'DATE' && row[0].trim() !== '' && 
              row[3] && row[3].trim() === 'Booked')) {
            return false;
        }
        
        // Parse the date from the row
        const dateStr = row[0];
        const dateParts = dateStr.replace(',', '').split(' ');
        
        // Handle different date formats
        let dateObj;
        if (dateParts.length >= 3) {
            // Format like "Sat, Apr 5" or "Sun, Apr 27"
            const month = dateParts[1];
            const day = parseInt(dateParts[2]);
            const year = new Date().getFullYear(); // Assume current year if not specified
            dateObj = new Date(`${month} ${day}, ${year}`);
        } else {
            // Try to parse as is
            dateObj = new Date(dateStr);
        }
        
        // Check if date is valid and in the future
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set to beginning of day for fair comparison
        
        return !isNaN(dateObj.getTime()) && dateObj >= today;
    });
    
    // Sort by date (assuming date is in column A)
    bookedRounds.sort((a, b) => {
        const dateA = new Date(a[0]);
        const dateB = new Date(b[0]);
        return dateA - dateB;
    });
    
    // Display the data
    if (bookedRounds.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="6" class="text-center">No booked rounds available.</td></tr>';
    } else {
        bookedRounds.forEach(row => {
            const tr = document.createElement('tr');
            
            // Create cells for each column
            // DATE
            const dateCell = document.createElement('td');
            dateCell.textContent = row[0] || '';
            tr.appendChild(dateCell);
            
            // TEE TIME
            const timeCell = document.createElement('td');
            timeCell.textContent = row[1] || '';
            tr.appendChild(timeCell);
            
            // COURSE
            const courseCell = document.createElement('td');
            courseCell.textContent = row[2] || '';
            tr.appendChild(courseCell);
            
            // STATUS
            const statusCell = document.createElement('td');
            statusCell.textContent = row[3] || '';
            // Add a class based on status
            if (row[3] && row[3].toLowerCase().includes('booked')) {
                statusCell.classList.add('text-success');
            } else {
                statusCell.classList.add('text-danger');
            }
            tr.appendChild(statusCell);
            
            // GROUPS
            const groupsCell = document.createElement('td');
            groupsCell.textContent = row[4] || '';
            tr.appendChild(groupsCell);
            
            // BOOKING NAME
            const nameCell = document.createElement('td');
            nameCell.textContent = row[6] || '';
            tr.appendChild(nameCell);
            
            tableBody.appendChild(tr);
        });
    }
}

/**
 * Displays sample data as a fallback
 */
function displaySampleData() {
    const tableBody = document.querySelector('#booked-rounds-table tbody');
    
    // Get current date for filtering
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to beginning of day for fair comparison
    
    // Current month and year for creating future dates
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    // Calculate future months (next 3 months)
    const futureMonths = [];
    for (let i = 0; i < 3; i++) {
        const futureMonth = new Date(currentYear, currentMonth + i, 1);
        const monthName = futureMonth.toLocaleString('default', { month: 'short' });
        futureMonths.push(monthName);
    }
    
    // Sample data with future dates only
    const sampleData = [
        [`Sat, ${futureMonths[0]} ${today.getDate() + 7}`, '11:00 AM', 'Bay Lands', 'Booked', '2', 'Mulligan Masters'],
        [`Sat, ${futureMonths[0]} ${today.getDate() + 14}`, '12:00 PM', 'Cinnabar', 'Booked', '2', 'Mulligan Masters'],
        [`Sat, ${futureMonths[0]} ${today.getDate() + 21}`, '12:00 PM', 'HMB Old', 'Booked', '2', 'Amit/Jackie'],
        [`Sun, ${futureMonths[1]} 5`, '10:00 AM', 'Poppy Hills', 'Booked', '5', 'Mulligan Masters'],
        [`Sat, ${futureMonths[1]} 12`, '11:30 AM', 'Bay Lands', 'Booked', '3', 'Mulligan Masters'],
        [`Sat, ${futureMonths[1]} 19`, '1:40 PM', 'Poppy Hills', 'Booked', '2', 'Colin Harker'],
        [`Sat, ${futureMonths[2]} 3`, '2:40 PM', 'Cinnabar', 'Booked', '2', 'Amit Thakkar']
    ];
    
    // Clear the table
    tableBody.innerHTML = '';
    
    // Add a note that this is sample data
    const noteRow = document.createElement('tr');
    const noteCell = document.createElement('td');
    noteCell.colSpan = 6;
    noteCell.classList.add('text-center', 'text-warning', 'small');
    noteCell.innerHTML = '<strong>Note:</strong> Showing sample data. Could not connect to live data source.';
    noteRow.appendChild(noteCell);
    tableBody.appendChild(noteRow);
    
    // Add the sample data
    sampleData.forEach(row => {
        const tr = document.createElement('tr');
        
        // Create cells for each column
        for (let i = 0; i < 6; i++) {
            const td = document.createElement('td');
            td.textContent = row[i] || '';
            
            // Add styling to the status column
            if (i === 3) {
                if (row[i].toLowerCase().includes('booked')) {
                    td.classList.add('text-success');
                } else {
                    td.classList.add('text-danger');
                }
            }
            
            tr.appendChild(td);
        }
        
        tableBody.appendChild(tr);
    });
}
