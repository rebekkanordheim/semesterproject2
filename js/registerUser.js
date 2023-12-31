import { loginUser } from './loginUser.js';

export async function validateRegistrationInputs(name, email, password, avatar) {
    return (
        name.length >= 1 &&
        password.length >= 8 &&
        email.match(/^[\w\-.]+@stud\.noroff\.no$/) &&
        avatar.trim() !== ''
    );
}

export async function handleRegistration(event) {
    event.preventDefault();

    const nameInput = document.getElementById('registerName');
    const emailInput = document.getElementById('registerEmail');
    const passwordInput = document.getElementById('registerPassword');
    const avatarInput = document.getElementById('registerAvatar');

    if (validateRegistrationInputs(nameInput.value, emailInput.value, passwordInput.value, avatarInput.value)) {
        try {
            await registerUser(nameInput.value, emailInput.value, passwordInput.value, avatarInput.value);
            
            // Log in the user after successful registration
            const userData = await loginUser(emailInput.value, passwordInput.value);

            const closeButton = document.querySelector('#registerModal .btn-close');
            closeButton.click();
        } catch (error) {
            console.error('Error during registration or login:', error);
            alert('An error occurred. Please try again later.');
        }
    } else {
        alert('Name must be at least 1 character long. Password must be 8 characters long, and email must be a valid Noroff student email, and remember an avatar image URL');
    }
}

export async function registerUser(name, email, password, avatar) {
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

const registerButton = document.getElementById('registerButton');
registerButton.addEventListener('click', handleRegistration);