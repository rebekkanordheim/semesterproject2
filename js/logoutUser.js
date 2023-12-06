function logoutUser() {
    localStorage.removeItem('jwtToken');
    console.log('The user has been logged out');
    updateButtonVisibility();

    setTimeout(() => {
        console.clear();
    }, 3000);
}

function updateButtonVisibility() {
    const registerButton = document.getElementById('createProfileButton');
    const loginButton = document.getElementById('loginHeaderButton');
    const logoutButton = document.getElementById('logoutButton');
    const profileButton = document.getElementById('profileButton');

    const jwtToken = localStorage.getItem('jwtToken');

    if (jwtToken) {
        logoutButton.style.display = 'inline-block';
        profileButton.style.display = 'inline-block';
        registerButton.style.display = 'none';
        loginButton.style.display = 'none';
    } else {
        logoutButton.style.display = 'none';
        profileButton.style.display = 'none';
        registerButton.style.display = 'inline-block';
        loginButton.style.display = 'inline-block';
    }
}

const logoutButton = document.getElementById('logoutButton');
logoutButton.addEventListener('click', logoutUser);

document.addEventListener('DOMContentLoaded', updateButtonVisibility);
