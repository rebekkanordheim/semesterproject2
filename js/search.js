document.addEventListener('DOMContentLoaded', function () {
    const searchField = document.getElementById('searchField');
    
    // Listen for input changes
    searchField.addEventListener('input', handleSearch);
    
    // Listen for Enter key press
    searchField.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            handleSearch();
        }
    });
});

async function handleSearch() {
    const searchField = document.getElementById('searchField');
    const searchTerm = searchField.value.trim().toLowerCase();

    if (searchTerm === '') {
        // If the search field is empty, display all listings
        populateCards(data);
        return;
    }

    // Use the search function to filter listings based on the title
    const searchResults = await search(data, searchTerm);

    // Display the search results in the .listing-content container
    populateCards(searchResults);
}

function populateCards(listings) {
    const cardsContainer = document.querySelector('.listing-content');
    cardsContainer.innerHTML = '';

    if (listings.length === 0) {
        // Display a message if there are no search results
        cardsContainer.innerHTML = '<p>No listings match your search.</p>';
        return;
    }

    listings.slice(0, itemsPerPage).forEach(item => {
        // Add code here to generate and append HTML for each listing
        // You can use item.title, item.description, etc. to access listing properties
        // Example:
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `<h2>${item.title}</h2><p>${item.description}</p>`;
        cardsContainer.appendChild(card);
    });
}
