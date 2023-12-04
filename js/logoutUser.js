/* function logoutUser() {
    localStorage.removeItem('jwtToken');
    console.log('The user has been logged out');

    const registerButton = document.getElementById('createProfileButton');
    const loginButton = document.getElementById('loginHeaderButton');
    const logoutButton = document.getElementById('logoutButton');
    const profileButton = document.getElementById('profileButton');

    const userLoggedIn = localStorage.getItem('jwtToken') !== null;

    if (userLoggedIn) {
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

    setTimeout(() => {
        console.clear();
    }, 3000);
}

const logoutButton = document.getElementById('logoutButton');
logoutButton.addEventListener('click', logoutUser);

document.addEventListener('DOMContentLoaded', logoutUser); */
function logoutUser() {
    localStorage.removeItem('jwtToken');
    console.log('The user has been logged out');
    updateButtonVisibility();  // Update button visibility immediately after logout

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

// Call updateButtonVisibility on DOMContentLoaded to set initial button visibility
document.addEventListener('DOMContentLoaded', updateButtonVisibility);
