async function fetchMessage() {
    fetch('https://g0f64e949e59aa7-tbsdb20210810.adb.ap-mumbai-1.oraclecloudapps.com/ords/triopexb/xpbooking/xpbooking', {
    method: 'GET', // or 'POST', 'PUT', 'DELETE', etc.
    headers: {
        'Access-Control-Allow-Origin': '*', // Or a specific origin
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', // Allowed methods
        'Access-Control-Allow-Headers': 'Content-Type, Authorization', // Allowed headers
    },
})
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log(data); // Handle the API response data

           try {
       

        // Extract unique dates and times
        const dates = [...new Set(data.items.map(item => new Date(item.booking_date).toLocaleDateString()))];
        const times = [...new Set(data.items.map(item => item.booking_time))].sort((a, b) => a - b);

        // Create table headers
        const headerRow = document.createElement('tr');
        headerRow.appendChild(document.createElement('th')); // Empty cell for row header
        dates.forEach(date => {
            const th = document.createElement('th');
            th.textContent = date;
            headerRow.appendChild(th);
        });
        bookingTable.appendChild(headerRow);

        // Create table rows for each booking time
        times.forEach(time => {
            const row = document.createElement('tr');
            const timeCell = document.createElement('td');
            timeCell.textContent = time;
            row.appendChild(timeCell);

            // Create cells for each date
            dates.forEach(date => {
                const cell = document.createElement('td');
                 cell.classList.add('my-class');
                const bookingsForDateAndTime = data.items.filter(item => 
                    new Date(item.booking_date).toLocaleDateString() === date && item.booking_time === time
                );

                // Populate cell with court numbers
                if (bookingsForDateAndTime.length > 0) {
                    //cell.textContent = bookingsForDateAndTime.map(b => `<div class="m-booked">Court ${b.court_no}</div>`).join(', ');
                    //cell.innerHTML   = bookingsForDateAndTime.map(b => `<div class="court bookedfor-${b.booked_for}">Court ${b.court_no}</div>`).join('');
                    cell.innerHTML = bookingsForDateAndTime
  .map(
    b =>
      `<div class="court bookedfor-${b.booked_for}" 
            data-booking-date="${b.booking_date}" 
            data-booking-time="${b.booking_time}"
            data-court-no="${b.court_no}">
         Court ${b.court_no}
       </div>`
  )
  .join('');

                } else {
                    cell.textContent = 'Available';
                }

                row.appendChild(cell);
            });

            bookingTable.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
        
    })
    .catch(error => {
        console.error('There was an error!', error);
    });

    //document.getElementById('message').textContent = data.message;
}



