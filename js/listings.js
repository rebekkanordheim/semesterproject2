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

// Console logging to check that the fetch works
async function showListings() {
    const listings = await getListings();
    console.log(listings);
    createListingsHTML(listings);
}

// Creating the HTML for each listing
function createListingsHTML(listings) {
    const container = document.querySelector('.card-content');

    listings.forEach(listing => {
        // Create the listing container 
        const listingsContainer = document.createElement('div');
        listingsContainer.classList.add('product-cards');
        listingsContainer.id = listing.id;

        // Create the listing title
        const title = document.createElement('h3');
        title.innerText = listing.title;
        listingsContainer.append(title);

        // Create the listing image
        const image = document.createElement('img');
        image.alt = listing.title;
        image.classList.add('card-image');
        // Check if listing has media and the first media item has a URL
        if (listing.media && listing.media[0] && listing.media[0].url) {
            image.src = listing.media[0].url;
        } else {
            // Using a placeholder image if the URL is undefined
            image.src = '../images/BidWaveLogo1.png';
        }
        listingsContainer.append(image);

        // Create button to get to each listings own site
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'actionButtonOne cardButton';
        button.innerText = 'VIEW';
        button.onclick = function () {
            window.location.href = `html/${listing.id}.html`;
        };
        listingsContainer.append(button);

        container.append(listingsContainer);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    showListings();
});