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
        button.className = 'btn-outline-success cardButton';
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
}); */

// listings.js
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
        const listingsContainer = document.createElement('div');
        listingsContainer.classList.add('product-cards');

        const title = document.createElement('h2');
        title.innerText = listing.title;
        listingsContainer.append(title);

        const image = document.createElement('img');
        if (listing.media && listing.media[0]) {
            image.src = listing.media[0].url;
        } else {
            image.src = 'images/BidWaveLogo1.png';
        }
        image.alt = listing.title;
        image.classList.add('card-image');
        listingsContainer.append(image);

        const bidForm = document.createElement('form');
        bidForm.classList.add('bid-form');
        bidForm.innerHTML = `
            <input class='form-control form-control-dark' type="number" id="bidAmount" name="bidAmount" placeholder="Your bid"required>

            <button type="button" class=" cardButton" onclick="addBid(${listing.id})">Add Bid</button>
        `;
        listingsContainer.append(bidForm);

        container.append(listingsContainer);
    });
}

document.addEventListener('DOMContentLoaded', async function () {
    try {
        const listings = await getListings();
        console.log(listings);
        createListingsHTML(listings);
        
        const isLoggedIn = localStorage.getItem('jwtToken') !== null;

        // Select the bid form elements
        const bidForms = document.getElementsByClassName('bid-form');

        // Convert the HTMLCollection to an array and iterate through
        Array.from(bidForms).forEach(bidForm => {
            bidForm.style.display = isLoggedIn ? 'block' : 'none';
        });
    } catch (error) {
        console.error('Error fetching listings:', error.message);
    }
});