// Function to log out the user
export function logoutUser() {
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
