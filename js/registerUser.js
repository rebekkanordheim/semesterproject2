// Function to validate form inputs
function validateRegistrationInputs(name, email, password, avatar) {
    return (
        name.length >= 1 &&
        password.length >= 8 &&
        email.match(/^[\w\-.]+@stud\.noroff\.no$/) &&
        avatar.trim() !== ''
    );
}

// Function to handle form submission
async function handleRegistration(event) {
    event.preventDefault();

    // Select form elements
    const nameInput = document.getElementById('registerName');
    const emailInput = document.getElementById('registerEmail');
    const passwordInput = document.getElementById('registerPassword');
    const avatarInput = document.getElementById('registerAvatar');
    const registerForm = document.getElementById('registerForm');

    // Validate form inputs
    if (validateRegistrationInputs(nameInput.value, emailInput.value, passwordInput.value, avatarInput.value)) {
        // If inputs are valid, register the user
        await registerUser(nameInput.value, emailInput.value, passwordInput.value, avatarInput.value);

        // Simulate a click event on the close button
        const closeButton = document.querySelector('#registerModal .btn-close');
        closeButton.click();
    } else {
        alert('Name must be at least 1 character long. Password must be 8 characters long, and email must be a valid Noroff student email, and remember an avatar image URL');
    }
}

// Attach event listener to register button
const registerButton = document.getElementById('registerButton');
registerButton.addEventListener('click', handleRegistration);

// Function to register the user
async function registerUser(name, email, password, avatar) {
    const registerUrl = 'https://api.noroff.dev/api/v1/auction/auth/register';

    try {
        // Validate form inputs
        if (validateRegistrationInputs(name, email, password, avatar)) {
            const userData = {
                name: name,
                email: email,
                password: password,
                avatar: avatar
            };

            // do API call
            const postData = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            };

            const response = await fetch(registerUrl, postData);

            if (response.ok) {
                // Registration successful, get JWT token from the response
                const data = await response.json();
                const token = data.accessToken;

                // Store the token in local storage
                localStorage.setItem('jwtToken', token);

                // Log name and email to console
                console.log('Name:', name);
                console.log('Email:', email);

                console.log('Registration successful! Token:', token);
                // You might want to redirect the user or perform other actions
            } else {
                // Handle registration error
                console.error('Registration failed. Please try again.');
                alert('Registration failed. Please try again.');
            }
        } else {
            // Handle validation errors
            alert('Name must be at least 1 character long. Password must be 8 characters long, and email must be a valid Noroff student email, and remember an avatar image URL');
        }
    } catch (error) {
        // Handle fetch error
        console.error('Error during registration:', error);
        alert('An error occurred. Please try again later.');
    }
}
