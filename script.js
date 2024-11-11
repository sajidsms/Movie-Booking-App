const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
const button = document.getElementById("button");
let ticketPrice = parseFloat(movieSelect.value); // Use parseFloat for potential float values
const convenienceFee = 64.0; // Define a convenience fee as a float

// Payment page
let payPrice = document.getElementById("rupees");

// Label seats with row and seat number
document.querySelectorAll('.row').forEach(row => {
    const rowLabel = row.getAttribute('data-row');
    row.querySelectorAll('.seat').forEach((seat, index) => {
        const seatNumber = index + 1;
        seat.textContent = `${rowLabel}${seatNumber}`;
    });
});

// Function to save movie data to localStorage
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem("selectedMovieIndex", movieIndex);
    localStorage.setItem("selectedMoviePrice", moviePrice);
}

// Function to update the count and total
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll(".row .seat.selected");
    const selectedSeatsCount = selectedSeats.length;
    const seatsTotal = parseFloat((selectedSeatsCount * ticketPrice).toFixed(2)); // Convert to float and round to 2 decimal places
    const totalPayable = parseFloat((seatsTotal + convenienceFee).toFixed(2)); // Include convenience fee and round to 2 decimal places

    count.innerText = selectedSeatsCount;
    total.innerText = `Rs. ${seatsTotal.toFixed(2)}`; // Show total (without convenience fee) with 2 decimal places
    updateButton(seatsTotal); // Pass total amount excluding fee
}

// Function to update the button text with the correct total (excluding convenience fee)
function updateButton(amount) {
    button.innerText = `Pay: Rs. ${amount.toFixed(2)}`; // Show amount on button with 2 decimal places
}

// Event listener for movie selection change
movieSelect.addEventListener("change", (e) => {
    ticketPrice = parseFloat(e.target.value); // Update ticket price as a float
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});

// Event listener for seat selection
container.addEventListener("click", (e) => {
    if (e.target.classList.contains("seat") && !e.target.classList.contains("occupied")) {
        e.target.classList.toggle("selected");
        updateSelectedCount();
    }
});

// Payment page update on button click
button.addEventListener("click", function() {
    const totalAmount = total.innerText; // Fetch total amount excluding fee
    const seatDetails = Array.from(document.querySelectorAll(".row .seat.selected"))
                             .map(seat => seat.textContent) // Fetch selected seat details
                             .join(', ');

    localStorage.setItem("totalAmount", totalAmount);
    localStorage.setItem("seatDetails", seatDetails); // Store seat details for summary

    // Redirect to payment page
    window.location.href = "payment.html";
});

// Initialize the UI with previously selected seats and update count
updateSelectedCount();
