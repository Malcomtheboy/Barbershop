// Get booking details
const booking = JSON.parse(localStorage.getItem('bookingDetails'));
const detailsContainer = document.getElementById('bookingDetails');

if(booking) {
    // Format date to readable string
    const bookingDate = new Date(booking.date);
    const formattedDate = bookingDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    detailsContainer.innerHTML = `
        <div class="detail-item">
            <span class="detail-label">Barber:</span>
            <span class="detail-value">${booking.barber.name}</span>
        </div>
        <div class="detail-item">
            <span class="detail-label">Date:</span>
            <span class="detail-value">${formattedDate}</span>
        </div>
        <div class="detail-item">
            <span class="detail-label">Time:</span>
            <span class="detail-value">${booking.time}</span>
        </div>
    `;
    
    // Clear temporary storage
    localStorage.removeItem('currentBooking');
} else {
    detailsContainer.innerHTML = `<p class="error-message">No booking details found. Please start a new booking.</p>`;
}