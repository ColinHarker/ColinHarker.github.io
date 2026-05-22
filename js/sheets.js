/**
 * Mulligan Masters Golf Group Website
 * Google Sheets Integration for Booked Rounds
 */

document.addEventListener('DOMContentLoaded', function() {
    // Only run this code on the events page
    if (document.getElementById('booked-rounds-table')) {
        fetchBookedRounds();
    }
    
    // Only run this code on the golf-for-good-scramble-event page
    if (document.getElementById('tournament-registrations-table')) {
        fetchTournamentRegistrations();
    }
});

/**
 * Fetches booked rounds data from Google Sheets
 */
function fetchBookedRounds() {
    const spreadsheetId = '1TToyNaNsboS7RTARk06NF08s673M0Jx2NORqvwy0qQI';
    const sheetName = '2026 Tee Schedule';
    const range = 'A7:G200'; // Expanded range to capture more data
    
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
            // Use 2026 to match the "2026 Tee Schedule" sheet
            const year = 2026;
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
            groupsCell.textContent = row[5] || '';
            tr.appendChild(groupsCell);

             // GROUPS
            const openSpots = document.createElement('td');
            openSpots.textContent = row[6] || '';
            tr.appendChild(openSpots);
            
            tableBody.appendChild(tr);
        });
    }
}

/**
 * Fetches tournament registration data from Google Sheets
 */
function fetchTournamentRegistrations() {
    const spreadsheetId = '1TToyNaNsboS7RTARk06NF08s673M0Jx2NORqvwy0qQI';
    const sheetName = 'Tourny 8/22/26 BLD'; // Tournament sheet name
    const range = 'A8:E200'; // Wide enough to capture all groups (sheet may have multiple rows per group)
    
    // Construct the URL for the Google Sheets API
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(sheetName + '!' + range)}?key=AIzaSyDfVHVyqAJhZseDLZlM_SCklEmew0FDOTU`;

    // Show loading message
    const tableBody = document.querySelector('#tournament-registrations-table tbody');
    tableBody.innerHTML = '<tr><td colspan="2" class="text-center">Loading tournament registrations...</td></tr>';
    
    // Fetch data from Google Sheets
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayTournamentRegistrations(data.values);
        })
        .catch(error => {
            console.error('Error fetching tournament data:', error);
            tableBody.innerHTML = `<tr><td colspan="2" class="text-center text-danger">Error loading registration data. Please try again later.</td></tr>`;
            
            // Fallback: Display sample data for demonstration
            displaySampleTournamentData();
        });
}

/**
 * Displays tournament registration data in grouped format by tee time
 * @param {Array} data - The data from Google Sheets
 */
function displayTournamentRegistrations(data) {
    const container = document.querySelector('#tournament-registrations-container');
    
    // Check if we have data
    if (!data || data.length === 0) {
        container.innerHTML = '<div class="text-center">No registrations available.</div>';
        return;
    }
    
    // Process the data to group by tee time
    const groups = processRegistrationData(data);
        
    // Create the new grouped display
    createGroupedRegistrationDisplay(container, groups);
}

/**
 * Processes raw sheet data into grouped format
 * @param {Array} data - Raw data from Google Sheets
 * @returns {Array} Array of group objects with tee time and players
 */
function processRegistrationData(data) {
    const groups = [];

    data.forEach(row => {
        if (!row) return;

        const teeTime = row[0] ? row[0].trim() : '';
        const groupNumber = row[1] ? row[1].trim() : '';
        const leadName = row[2] ? row[2].trim() : '';   // Column C: group lead
        const playerCountRaw = row[4] ? String(row[4]).trim() : ''; // Column E: # players

        // Skip empty rows / rows without a lead
        if (!teeTime && !leadName) return;
        if (!leadName) return;

        const parsedCount = parseInt(playerCountRaw, 10);
        const playerCount = isNaN(parsedCount) ? 0 : parsedCount;

        groups.push({
            teeTime: teeTime,
            groupNumber: groupNumber,
            leadName: leadName,
            playerCount: playerCount
        });
    });

    groups.sort((a, b) => {
        const timeA = convertTimeToMinutes(a.teeTime);
        const timeB = convertTimeToMinutes(b.teeTime);
        return timeA - timeB;
    });

    return groups;
}

/**
 * Converts time string to minutes for sorting
 * @param {string} timeStr - Time string like "11:10 AM"
 * @returns {number} Minutes since midnight
 */
function convertTimeToMinutes(timeStr) {
    if (!timeStr) return 0;
    
    const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (!match) return 0;
    
    let hours = parseInt(match[1]);
    const minutes = parseInt(match[2]);
    const period = match[3].toUpperCase();
    
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    
    return hours * 60 + minutes;
}

/**
 * Creates the grouped registration display
 * @param {Element} container - Container element
 * @param {Array} groups - Processed group data
 */
function createGroupedRegistrationDisplay(container, groups) {
    if (groups.length === 0) {
        container.innerHTML = '<div class="text-center">No registrations available.</div>';
        return;
    }

    let html = '<div class="tournament-groups" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 12px;">';

    groups.forEach(group => {
        html += `
            <div class="group-card" style="padding: 14px 16px; border: 1px solid var(--editorial-rule-soft); background: #fff; display: flex; flex-direction: column; gap: 4px;">
                <div style="font-family: 'Inter', sans-serif; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--editorial-text-muted);">
                    <i class="fas fa-clock me-1"></i>${group.teeTime}${group.groupNumber ? ' · Grp ' + group.groupNumber : ''}
                </div>
                <div style="font-family: 'Playfair Display', serif; font-size: 17px; color: var(--editorial-forest); line-height: 1.2;">
                    ${group.leadName}
                </div>
            </div>
        `;
    });

    html += '</div>';

    html += `
        <div class="text-center" style="margin-top: 24px; font-family: 'Inter', sans-serif; font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--editorial-text-muted);">
            ${groups.length} ${groups.length === 1 ? 'Group' : 'Groups'} Registered
        </div>
    `;

    container.innerHTML = html;
}

/**
 * Displays sample tournament data as a fallback
 */
function displaySampleTournamentData() {
    const tableBody = document.querySelector('#tournament-registrations-table tbody');
    
    // Sample tournament registration data
    const sampleData = [
        ['Clint', 'Paid'],
        ['Mike', 'Unpaid'],
        ['Daniel', 'Unpaid'],
        ['Patrick', 'Unpaid'],
        ['Harold', 'Paid'],
        ['Pat', 'Paid'],
        ['Jason', 'Paid']
    ];
    
    // Clear the table
    tableBody.innerHTML = '';
    
    // Add a note that this is sample data
    const noteRow = document.createElement('tr');
    const noteCell = document.createElement('td');
    noteCell.colSpan = 2;
    noteCell.classList.add('text-center', 'text-warning', 'small');
    noteCell.innerHTML = '<strong>Note:</strong> Showing sample data. Could not connect to live data source.';
    noteRow.appendChild(noteCell);
    tableBody.appendChild(noteRow);
    
    // Add the sample data
    sampleData.forEach(row => {
        const tr = document.createElement('tr');
        
        // Golfer Name
        const nameCell = document.createElement('td');
        nameCell.textContent = row[0];
        tr.appendChild(nameCell);
        
        // Payment Status
        const statusCell = document.createElement('td');
        const status = row[1];
        statusCell.textContent = status;
        
        // Add styling based on payment status
        if (status.toLowerCase() === 'paid') {
            statusCell.classList.add('text-success', 'fw-bold');
            statusCell.innerHTML = '<i class="fas fa-check-circle me-1"></i>' + status;
        } else if (status.toLowerCase() === 'unpaid') {
            statusCell.classList.add('text-danger', 'fw-bold');
            statusCell.innerHTML = '<i class="fas fa-exclamation-circle me-1"></i>' + status;
        }
        
        tr.appendChild(statusCell);
        tableBody.appendChild(tr);
    });
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
