document.addEventListener('DOMContentLoaded', async function() {
    const newPostForm = document.getElementById('newPostForm');
    newPostForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        try {
            const formData = new FormData(newPostForm);
            const response = await createNewPost(formData);

            console.log('New post created: ', response);

            newPostForm.reset();
        } catch (error) {
            console.error('Error creating new post:', error.message);
        }
    });
});

async function createNewPost(postData) {
    try {
        const apiUrl = 'https://api.noroff.dev/api/v1/auction/listings';
        const accessToken = localStorage.getItem('jwtToken');

        const headers = new Headers();
        headers.append('Authorization', `Bearer ${accessToken}`);
        headers.append('Content-Type', 'application/json');

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(postData),
        });

        if (!response.ok) {
            throw new Error('Failed to create new post');
        }

        return await response.json();
    } catch (error) {
        console.error('Error creating new post:', error.message);
        throw error;
    }
}
