/* import router from "./router/index.js";
import ui from "./ui/index.js";

ui()
router() */

/* // Assuming you have a function to check the authentication status
function isUserLoggedIn() {
    // Replace this with your actual authentication check logic
    // For example, check if a user is logged in based on stored tokens, etc.
    const userToken = localStorage.getItem("token"); // Assuming you store the token in local storage
  
    // Return true if the user is logged in (token is present), false otherwise
    return !!userToken;
  }
import login from "./src/js/api/auth/login";
  
  // Function to update button visibility based on authentication status
  function updateHeaderButtonVisibility() {
    const logoutButton = document.getElementById('logoutButton');
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
  
  // Add an event listener for the page load or when the user logs in/out
  document.addEventListener('DOMContentLoaded', updateHeaderButtonVisibility);
  
  // Add this wherever you perform login/logout actions
  // For example, after successfully logging in or out
  // Call updateHeaderButtonVisibility() to update button visibility accordingly
   */