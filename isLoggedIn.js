// Function to check if the user is logged in
function checkLoginStatus() {
    const userLoggedIn = localStorage.getItem('jwtToken') !== null;

    // Select the buttons
    const logoutButton = document.getElementById('logoutButton');
    const registerButton = document.querySelector('createProfileButton');
    const loginButton = document.querySelector('loginButton');

    // Toggle visibility based on the user's login status
    if (userLoggedIn) {
        logoutButton.style.display = 'inline-block';
        registerButton.style.display = 'none';
        loginButton.style.display = 'none';
    } else {
        logoutButton.style.display = 'none';
        registerButton.style.display = 'inline-block';
        loginButton.style.display = 'inline-block';
    }
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', checkLoginStatus);
