function validateRegistrationInputs(name, email, password, avatar) {
    return (
        name.length >= 1 &&
        password.length >= 8 &&
        email.match(/^[\w\-.]+@stud\.noroff\.no$/) &&
        avatar.trim() !== ''
    );
}

async function handleRegistration(event) {
    event.preventDefault();

    const nameInput = document.getElementById('registerName');
    const emailInput = document.getElementById('registerEmail');
    const passwordInput = document.getElementById('registerPassword');
    const avatarInput = document.getElementById('registerAvatar');

    if (validateRegistrationInputs(nameInput.value, emailInput.value, passwordInput.value, avatarInput.value)) {
        await registerUser(nameInput.value, emailInput.value, passwordInput.value, avatarInput.value);

        const closeButton = document.querySelector('#registerModal .btn-close');
        closeButton.click();
    } else {
        alert('Name must be at least 1 character long. Password must be 8 characters long, and email must be a valid Noroff student email, and remember an avatar image URL');
    }
}

async function registerUser(name, email, password, avatar) {
    const registerUrl = 'https://api.noroff.dev/api/v1/auction/auth/register';

    try {
        if (validateRegistrationInputs(name, email, password, avatar)) {
            const userData = {
                name: name,
                email: email,
                password: password,
                avatar: avatar
            };

            const postData = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            };

            const response = await fetch(registerUrl, postData);

            if (response.ok) {
                const data = await response.json();
                const token = data.accessToken;

                localStorage.setItem('jwtToken', token);

                console.log('Email:', email);

                console.log('Registration successful! Token:', token);

                updateButtonVisibility();  // Update button visibility after successful registration
            } else {
                console.error('Registration failed. Please try again.');
                alert('Registration failed. Please try again.');
            }
        } else {
            alert('Name must be at least 1 character long. Password must be 8 characters long, and email must be a valid Noroff student email, and remember an avatar image URL');
        }
    } catch (error) {
        console.error('Error during registration:', error);
        alert('An error occurred. Please try again later.');
    }
}

// Call updateButtonVisibility on DOMContentLoaded to set initial button visibility
document.addEventListener('DOMContentLoaded', updateButtonVisibility);

const registerButton = document.getElementById('registerButton');
registerButton.addEventListener('click', handleRegistration);
