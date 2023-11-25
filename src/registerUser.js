function validateForm() {
    // Get form inputs
    var name = document.getElementById('registerName').value;
    var email = document.getElementById('registerEmail').value;
    var password = document.getElementById('registerPassword').value;

    // Validate name 
    if (name.length < 1) {
        alert('Name must be at least 1 character long.');
        return false;
    }
    // Validate email 
    if (!email.endsWith('@stud.noroff.no')) {
        alert('Email must be a @stud.noroff.no email.');
        return false;
    }
    // Validate password
    if (password.length < 8) {
        alert('Password must be at least 8 characters long.');
        return false;
    }

    // If all validations pass, proceed to index.html
    var jwtToken = generateJWT(); // Need to implement a function to generate a JWT token
    localStorage.setItem('username', name);
    localStorage.setItem('jwtToken', jwtToken);

    window.location.href = 'index.html';
    return true;
}

// Function to generate a simple JWT token (for demonstration purposes)
function generateJWT() {
    // Implement your JWT generation logic here
    // This is a simplified example and not secure for production use
    return 'yourGeneratedJWT';
}