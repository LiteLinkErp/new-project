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
    })
    .catch(error => {
        console.error('There was an error!', error);
    });

    //document.getElementById('message').textContent = data.message;
}



