async function fetchMessage() {
    const response = await fetch('https://xtremepadelzambia-ln6wiorvw-litelinkerps-projects.vercel.app/api/apex');
    const data = await response.json();
    document.getElementById('message').textContent = data.message;
}
