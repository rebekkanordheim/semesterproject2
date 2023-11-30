/* // Function to log out the user
function logoutUser() {
    // Remove the JWT token from local storage
    localStorage.removeItem('jwtToken');
    
    // Log a message to the console
    console.log('The user has been logged out');

    // Toggle visibility of buttons
    const registerButton = document.getElementById('createProfileButton');
    const loginButton = document.getElementById('loginButton');
    const logoutButton = document.getElementById('logoutButton');

    // Show create profile and login buttons, hide logout button
    registerButton.style.display = 'inline-block';
    loginButton.style.display = 'inline-block';
    logoutButton.style.display = 'none';
}

// Add a click event listener to the logout button
const logoutButton = document.getElementById('logoutButton');
logoutButton.addEventListener('click', logoutUser);
 */

// Function to log out the user
function logoutUser() {
    // Remove the JWT token from local storage
    localStorage.removeItem('jwtToken');

    // Log a message to the console
    console.log('The user has been logged out');

    // Toggle visibility of buttons based on the presence of JWT token
    const registerButton = document.getElementById('createProfileButton');
    const loginButton = document.getElementById('loginButton');
    const logoutButton = document.getElementById('logoutButton');

    const userLoggedIn = localStorage.getItem('jwtToken') !== null;

    if (userLoggedIn) {
        // Show logout button
        logoutButton.style.display = 'inline-block';
        // Hide create profile and login buttons
        registerButton.style.display = 'none';
        loginButton.style.display = 'none';
    } else {
        // Hide logout button
        logoutButton.style.display = 'none';
        // Show create profile and login buttons
        registerButton.style.display = 'inline-block';
        loginButton.style.display = 'inline-block';
    }
}

// Add a click event listener to the logout button
const logoutButton = document.getElementById('logoutButton');
logoutButton.addEventListener('click', logoutUser);

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', logoutUser);
