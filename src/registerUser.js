// Function to handle form submission
function handleRegistration(event) {
    event.preventDefault();

    // Select form elements
    const nameInput = document.getElementById('registerName');
    const emailInput = document.getElementById('registerEmail');
    const passwordInput = document.getElementById('registerPassword');
    const avatarInput = document.getElementById('registerAvatar');

    // Validate form inputs
    if (
        nameInput.value.length >= 1 &&
        passwordInput.value.length >= 8 &&
        emailInput.value.match(/^[\w\-.]+@stud\.noroff\.no$/) &&
        avatarInput.value.trim() !== ''
    ) {
        // If inputs are valid, register the user
        registerUser(
            nameInput.value,
            emailInput.value,
            passwordInput.value,
            avatarInput.value
        );
    } else {
        alert('Name must be at least 1 character long. Password must be 8 characters long, and email must be a valid Noroff student email, and remember an avatar image URL');
    }
}
const registerButton = document.getElementById('registerButton');
registerButton.addEventListener('click', handleRegistration);



// Function to register the user
function registerUser(name, email, password, avatar) {
    const registerUrl = 'https://api.noroff.dev/api/v1/auction/auth/register';

    const userData = {
        name: name,
        email: email,
        password: password,
        avatar: avatar
    };

    const fetchOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    };

    fetch(registerUrl, fetchOptions)
        .then(response => {
            if (response.ok) {
                // Registration successful, get JWT token from the response
                return response.json();
            } else {
                throw new Error('Registration failed. Please try again.');
            }
        })
        .then(data => {
            // Assuming the API returns a token property in the response
            const token = data.token;

            // Store the token in local storage
            localStorage.setItem('jwtToken', token);

            console.log('Registration successful! Token:', token);
            // You might want to redirect the user or perform other actions
        })
        .catch(error => {
            console.error('Error during registration:', error);
            alert(error.message || 'An error occurred. Please try again later.');
        });
}