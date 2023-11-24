/* import router from "./router/index.js";
import ui from "./ui/index.js";

ui()
router() */

// Function to check if the user is logged in
function isUserLoggedIn() {
    // Implement your logic here to check if the user is logged in
    // For example, check if you have a valid token or user session
    // Return true if logged in, false otherwise
    return true;
  }
  
  // Function to update header button visibility based on authentication status
  function updateHeaderButtonVisibility() {
    const logoutButton = document.getElementById('logoutButton'); // Assuming the ID is set for the logout button
    const loginButton = document.querySelector('[data-auth=login]');
    const registerButton = document.querySelector('[data-auth=register]');
  
    if (isUserLoggedIn()) {
      // User is logged in
      logoutButton.style.display = 'inline-block';
      loginButton.style.display = 'none';
      registerButton.style.display = 'none';
    } else {
      // User is logged out
      logoutButton.style.display = 'none';
      loginButton.style.display = 'inline-block';
      registerButton.style.display = 'inline-block';
    }
  }
  
  document.addEventListener('DOMContentLoaded', updateHeaderButtonVisibility);