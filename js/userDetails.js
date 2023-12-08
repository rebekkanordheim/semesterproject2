/* function updateUserDetails() {
    console.log('Function called!');  // Log to check if the function is being called

    var jwtToken = localStorage.getItem('jwtToken');
    var email = localStorage.getItem('email');
    var profileHeader = document.getElementsByClassName('profile-header');

    console.log('jwtToken:', jwtToken);  // Log to check the value of jwtToken
    console.log('email:', email);  // Log to check the value of email

    if (jwtToken && email) {
        profileHeader.textContent = email;
        registerLink.style.display = 'none';
        console.log('User is logged in!');
    } else {
        profileHeader.textContent = 'Guest';
        registerLink.style.display = 'block';
        console.log('User is not logged in!');
    }
}
updateUserDetails(); */