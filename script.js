// Barber Data
const barbers = [
    {
        id: 1,
        name: "Tony Marino",
        specialty: "Classic Cuts",
        image: "images/barber1.jpg",
        workingHours: {
            start: 9,
            end: 18,
            breakStart: 13,
            breakEnd: 14
        }
    },
    {
        id: 2,
        name: "Marcus Steel",
        specialty: "Modern Fades",
        image: "images/barber2.jpg",
        workingHours: {
            start: 10,
            end: 19,
            breakStart: 14,
            breakEnd: 15
        }
    }
];

let selectedBarber = null;
let selectedDate = null;
let selectedTime = null;

// Initialize Booking Page
function initBooking() {
    renderBarbers();
    setupCalendar();
    setupNavigation();
}

// Barber Selection
function renderBarbers() {
    const grid = document.getElementById('barberGrid');
    grid.innerHTML = barbers.map(barber => `
        <div class="barber-card" data-id="${barber.id}" onclick="selectBarber(${barber.id})">
            <img src="${barber.image}" alt="${barber.name}">
            <h3>${barber.name}</h3>
            <p>${barber.specialty}</p>
        </div>
    `).join('');
}

function selectBarber(barberId) {
    selectedBarber = barbers.find(b => b.id === barberId);
    document.querySelectorAll('.barber-card').forEach(card => {
        card.classList.remove('selected');
    });
    event.target.closest('.barber-card').classList.add('selected');
}

// Calendar System
function setupCalendar() {
    const currentDate = new Date();
    renderCalendar(currentDate);
}

function renderCalendar(date) {
    const calendar = document.getElementById('calendar');
    const monthYear = date.toLocaleString('default', { month: 'long', year: 'numeric' });
    document.getElementById('currentMonth').textContent = monthYear;

    // Calendar generation logic
    // (Implement full calendar with date validation)
}

// Time Slots
function generateTimeSlots() {
    if (!selectedBarber || !selectedDate) return;
    
    const slotsContainer = document.getElementById('timeSlots');
    slotsContainer.innerHTML = '';
    
    const startHour = selectedBarber.workingHours.start;
    const endHour = selectedBarber.workingHours.end;
    
    for (let hour = startHour; hour < endHour; hour++) {
        if (hour >= selectedBarber.workingHours.breakStart && 
            hour < selectedBarber.workingHours.breakEnd) continue;
            
        const time = `${hour}:00`;
        const timeSlot = document.createElement('div');
        timeSlot.className = 'time-slot';
        timeSlot.textContent = time;
        timeSlot.onclick = () => selectTime(time);
        slotsContainer.appendChild(timeSlot);
    }
}

// Navigation
function showStep(step) {
    document.querySelectorAll('.booking-section').forEach(section => {
        section.classList.remove('active');
    });
    document.querySelector(`[data-step="${step}"]`).classList.add('active');
}

function confirmBooking() {
    if (!selectedBarber || !selectedDate || !selectedTime) {
        alert('Please complete all selections');
        return;
    }
    
    const bookingDetails = {
        barber: selectedBarber.name,
        date: selectedDate.toDateString(),
        time: selectedTime
    };
    
    localStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));
    window.location.href = 'confirmation.html';
}

// Initialize
document.addEventListener('DOMContentLoaded', initBooking);