// Function to handle form submission
function handleRegistration(event) {
    event.preventDefault();

    // Select form elements
    const nameInput = document.getElementById('registerName');
    const emailInput = document.getElementById('registerEmail');
    const passwordInput = document.getElementById('registerPassword');
    const avatarInput = document.getElementById('registerAvatar');
    const registerForm = document.getElementById('registerForm');

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

        // Close the form and reset values
        registerForm.reset();
        const registerModal = new bootstrap.Modal(document.getElementById('registerModal'));
        registerModal.hide();

    } else {
        alert('Name must be at least 1 character long. Password must be 8 characters long, and email must be a valid Noroff student email, and remember an avatar image URL');
    }
}
const registerButton = document.getElementById('registerButton');
registerButton.addEventListener('click', handleRegistration);


// Function to register the user
async function registerUser(name, email, password, avatar) {
    const registerUrl = 'https://api.noroff.dev/api/v1/auction/auth/register';

    // Validate form inputs
    if (
        name.length >= 1 &&
        password.length >= 8 &&
        email.match(/^[\w\-.]+@stud\.noroff\.no$/) &&
        avatar.trim() !== ''
    ) {
        const userData = {
            name: name,
            email: email,
            password: password,
            avatar: avatar
        };

        try {
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
        } catch (error) {
            // Handle fetch error
            console.error('Error during registration:', error);
            alert('An error occurred. Please try again later.');
        }
    } else {
        // Handle validation errors
        alert('Name must be at least 1 character long. Password must be 8 characters long, and email must be a valid Noroff student email, and remember an avatar image URL');
    }
}
