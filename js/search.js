/* // Search function based on the title property
function searchListings(listings, searchTerm) {
    searchTerm = searchTerm.toLowerCase();
    return listings.filter(item => item.title.toLowerCase().includes(searchTerm));
}

// Handle search function
async function handleSearch() {
    const searchField = document.getElementById('searchField');
    const searchTerm = searchField.value.trim();

    if (searchTerm === '') {
        // If the search field is empty, display all listings
        const listings = await getListings();
        createListingsHTML(listings);
        return;
    }

    const listings = await getListings();
    const searchResults = searchListings(listings, searchTerm);

    // Display the search results in the .listing-content container
    createListingsHTML(searchResults);
}
 */