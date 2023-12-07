/* // Fetching from the API
async function getListings() {
    const response = await fetch('https://api.noroff.dev/api/v1/auction/listings?_bids=true');
    
    if (!response.ok) {
        throw new Error('Failed to fetch listings');
    }
    
    return await response.json();
}

// Console logging to check that the fetch works
async function showListings() {
    const listings = await getListings();
    console.log(listings);
}
showListings();

// Creating the HTML for each post that gets called from the API
function createListingsHTML(listings) {
    const container = document.querySelector('card-content');

    listings.forEach(listing => {
        // Create the listing container 
        const listingsContainer = document.createElement('div');
        listingsContainer.classList.add('product-cards');
        listingsContainer.id = listing.id;

        // Create the listing title
        const title = document.createElement('h3');
        title.innerText = listing.title.rendered;
        listingsContainer.append(title);

        // Create the listing content
        const content = document.createElement('div');
        content.innerHTML = listing.content.rendered;
        listingsContainer.append(content);

        container.append(listingsContainer);
    });
}
 */



// Fetching from the API
async function getListings() {
    const response = await fetch('https://api.noroff.dev/api/v1/auction/listings?_bids=true');

    if (!response.ok) {
        throw new Error('Failed to fetch listings');
    }
    return await response.json();
}

// Creating the HTML for each listing
function createListingsHTML(listings) {
    const container = document.querySelector('.card-content');

    listings.forEach(listing => {
        // Create the listing container 
        const listingsContainer = document.createElement('div');
        listingsContainer.classList.add('product-cards');

        // Create the listing title
        const title = document.createElement('h2');
        title.innerText = listing.title;
        listingsContainer.append(title);

        // Create the listing image
        const image = document.createElement('img');
        image.src = listing.media && listing.media[0] ? listing.media[0].url : 'images/BidWaveLogo1.png';
        image.alt = listing.title;
        image.classList.add('card-image');
        listingsContainer.append(image);

        // Create button to get to each listings own site
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'actionButtonOne cardButton';
        button.innerText = 'Show';
        button.onclick = function () {
            window.location.href = `html/${listing.id}.html`;
        };
        listingsContainer.append(button);

        container.append(listingsContainer);
    });
}

// Console logging to check that the fetch works
async function showListings() {
    const listings = await getListings();
    console.log(listings);
    createListingsHTML(listings);
}

document.addEventListener('DOMContentLoaded', function () {
    showListings();
});