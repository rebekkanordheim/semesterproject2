async function handleLogin(event) {
    event.preventDefault();

    const emailInput = document.getElementById('loginEmail');
    const passwordInput = document.getElementById('loginPassword');
    const loginForm = document.getElementById('loginForm');
    const closeModalButton = document.querySelector('#loginModal .btn-close');

    if (emailInput.value.match(/^[\w\-.]+@stud\.noroff\.no$/) && passwordInput.value.length >= 8) {
        try {
            const userData = await loginUser(emailInput.value, passwordInput.value);

            window.location.href = 'profile.html';

            loginForm.style.display = 'none';
            alert('Login successful! Email: ' + emailInput.value);
            closeModalButton.click();

        } catch (error) {
            console.error('Error during login', error);
            alert('An error occurred. Please try again later.');
        }
    } else {
        alert('Email must be a valid Noroff student email, and password must be 8 characters long.');
    }
}

async function loginUser(email, password) {
    const loginUrl = 'https://api.noroff.dev/api/v1/auction/auth/login';
    const userData = {
        email: email,
        password: password
    };

    try {
        const postData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        };

        const response = await fetch(loginUrl, postData);

        if (response.ok) {
            const data = await response.json();
            const token = data.accessToken;

            localStorage.setItem('jwtToken', token);

            toggleButtonVisibility();
            console.log('Login successful! Email:', email);
            console.log('User Data:', userData);
            document.getElementById('loginSuccessMessage').textContent = 'Login successful! Email: ' + email;

            return data.user;
        } else {
            throw new Error('Login failed. Please check your email and password, and ensure you have registered first.');
        }
    } catch (error) {
        console.error('Error during login', error);
        alert('An error occurred. Please try again later.');
    }
}

function toggleButtonVisibility() {
    const registerButton = document.getElementById('createProfileButton');
    const loginButton = document.getElementById('loginHeaderButton');
    const logoutButton = document.getElementById('logoutButton');
    const profileButton = document.getElementById('profileButton');

    const jwtToken = localStorage.getItem('jwtToken');

    if (jwtToken) {
        logoutButton.style.display = 'inline-block';
        profileButton.style.display = 'inline-block';
        registerButton.style.display = 'none';
        loginButton.style.display = 'none';
    } else {
        logoutButton.style.display = 'none';
        profileButton.style.display = 'none';
        registerButton.style.display = 'inline-block';
        loginButton.style.display = 'inline-block';
    }
}

const loginButton = document.getElementById('loginButton');
loginButton.addEventListener('click', handleLogin);
