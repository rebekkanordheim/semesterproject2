// function to handle the login form submission
function handleLogin(event) {
    event.preventDefault();

    // select the form elements
    const emailInput = document.getElementById('loginEmail');
    const passwordInput = document.getElementById('loginPassword');
    const loginForm = document.getElementById('loginForm');

    // validating the form inputs
    if (emailInput.value.match(/^[\w\-.]+@stud\.noroff\.no$/) && passwordInput.value.length >= 8) {
        // if the inputs are valid, login the user
        loginUser(emailInput.value, passwordInput.value);
        // close the form and reset the values
        loginForm.reset();

        // Hide the login modal
        const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
        loginModal.hide();

        // Optionally, you can close or remove the login form as well
        loginForm.style.display = 'none'; // or loginForm.remove();

        // Optionally, you can hide the modal backdrop as well
        const modalBackdrops = document.getElementsByClassName('modal-backdrop');
        for (const backdrop of modalBackdrops) {
            backdrop.style.display = 'none';
        }
    } else {
        alert('Email must be a valid Noroff student email, and password must be 8 characters long.');
    }
}

// Add a click event listener to the login button
const loginButton = document.getElementById('loginButton');
loginButton.addEventListener('click', handleLogin);


// Function to log in the user
function loginUser(email, password) {
    const loginUrl = 'https://api.noroff.dev/api/v1/auction/auth/login';
    const userData = {
        email: email,
        password: password
    };

    try {
        // Do API call
        const postData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        };

        fetch(loginUrl, postData)
            .then(response => {
                if (response.ok) {
                    // Login successful
                    console.log('Login successful! Email:', email);
                    document.getElementById('loginSuccessMessage').textContent = 'Login successful! Email: ' + email;
                    return response.json();
                } else {
                    throw new Error('Login failed. Please check your email and password, and ensure you have registered first.');
                }
            })
            .then(data => {
                // Assuming the API returns a token property in the response
                const token = data.accessToken;
                // Saving the JWT token to local storage
                localStorage.setItem('jwtToken', token);
                // Display a success message
                alert('Login successful! Email: ' + email);
            })
            .catch(error => {
                // Handle login error
                console.error('Error during login', error);
                alert('An error occurred. Please try again later.');
            });
    } catch (error) {
        console.error('Unexpected error during login', error);
        alert('An unexpected error occurred. Please try again later.');
    }
}

