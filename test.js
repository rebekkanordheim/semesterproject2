// Creating the HTML for each listing
function createListingsHTML(listings) {
    const container = document.querySelector('.listing-content');

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
        bidForm.classList.add('bid-form', 'form-control-dark', 'text-bg-dark');
        bidForm.innerHTML = `
            <label for="bidAmount">Your Bid Amount:</label>
            <input type="number" id="bidAmount${listing.id}" name="bidAmount" required class="form-control form-control-dark text-bg-dark" placeholder="Your bid">
            <button type="button" class="actionButtonOne cardButton" onclick="addBid(${listing.id})">Add Bid</button>
            <div id="bidSuccessMessage${listing.id}" class="bid-success-message"></div>
        `;
        listingsContainer.append(bidForm);

        container.append(listingsContainer);
    });
}

// Function to add a bid (you may customize this logic)
function addBid(listingId) {
    const bidAmountInput = document.getElementById(`bidAmount${listingId}`);
    const bidAmount = bidAmountInput.value;

    // Check if bid amount is valid
    if (isNaN(bidAmount) || bidAmount <= 0) {
        alert('Please enter a valid bid amount.');
        return;
    }

    console.log(`Adding bid of ${bidAmount} for listing ${listingId}`);

    // Add your logic to handle the bid

    // Show success message
    const successMessage = document.getElementById(`bidSuccessMessage${listingId}`);
    successMessage.innerText = 'Your bid has been placed!';

    // You can add additional logic to hide the message after a certain time
    setTimeout(() => {
        successMessage.innerText = ''; // Clear the message
    }, 3000); // Display for 3 seconds (adjust as needed)
}
