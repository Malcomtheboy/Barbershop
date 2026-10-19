
document.getElementById('registrationForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get existing booking details
    const booking = JSON.parse(localStorage.getItem('currentBooking'));
    
    // Add user information
    booking.user = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value
    };

    // Save complete booking
    localStorage.setItem('bookingDetails', JSON.stringify(booking));
    
    // Redirect to confirmation
    window.location.href = 'confirmation.html';
});

// Phone number formatting
document.getElementById('phone').addEventListener('input', function(e) {
    let x = e.target.value.replace(/\D/g, '').match(/(\d{0,4})(\d{0,3})(\d{0,3})/);
    e.target.value = !x[2] ? x[1] : x[1] + ' ' + x[2] + (x[3] ? ' ' + x[3] : '');
});

// Check for existing booking
if(!localStorage.getItem('currentBooking')) {
    window.location.href = 'booking.html';
}