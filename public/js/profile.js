const prefFormHandler = async (event) => {
    event.preventDefault();

    // Collect values from the login form
    const id = document.querySelector('#pref-id').innerHTML;
    const spaceX = document.querySelector('#spaceX').checked;
    const iss = document.querySelector('#iss').checked;
    const snapi = document.querySelector('#snapi').checked;

    if (id && spaceX != null && iss != null && snapi != null) {
        // Send a PUT request to the API endpoint
        const response = await fetch('/api/preferences/'+id, {
            method: 'PUT',
            body: JSON.stringify({ spaceX, iss, snapi }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            // If successful, redirect the browser to the homepage
            document.location.replace('/home');
        } else {
            alert(response.statusText);
        }
    }
};

document
.querySelector('.pref-form')
.addEventListener('submit', prefFormHandler);