async function fetchMessage() {
    const response = await fetch('/api/hello');
    const data = await response.json();
    document.getElementById('message').textContent = data.message;
}
