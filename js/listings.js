async function getListings() {
    try {
        const timestamp = new Date().getTime();
        const apiUrl = `https://api.noroff.dev/api/v1/auction/listings?_bids=true&_timestamp=${timestamp}&sort=created`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error('Failed to fetch listings');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching listings:', error.message);
        throw error;
    }
}

function createListingsHTML(listings) {
    const container = document.querySelector('.listing-content');

    listings.forEach(listing => {
        const listingsContainer = document.createElement('div');
        listingsContainer.classList.add('product-cards', 'mb-4', 'p-3', 'border', 'rounded');

        const title = document.createElement('h2');
        title.innerText = listing.title;
        title.classList.add('headingTwo');
        listingsContainer.append(title);

        const image = document.createElement('img');
        if (listing.media && listing.media.length > 0) {
            image.src = listing.media[0];
        } else {
            image.src = 'images/BidWaveLogo1.png';
        }
        image.alt = listing.title;
        image.classList.add('card-image', 'my-3');
        listingsContainer.append(image);

        const bidForm = document.createElement('form');
        bidForm.classList.add('bid-form', 'mb-3');
        bidForm.innerHTML = `
            <div class="input-group mb-3">
                <input type="number" class="form-control" id="bidAmount" name="bidAmount" placeholder="Enter your bid" required>
                <button type="button" class="btn btn-success" onclick="addBid(${listing.id})">Add Bid</button>
            </div>
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

        const bidForms = document.getElementsByClassName('bid-form');

        Array.from(bidForms).forEach(bidForm => {
            bidForm.style.display = isLoggedIn ? 'block' : 'none';
        });
    } catch (error) {
        console.error('Error in initialization:', error.message);
    }
});
