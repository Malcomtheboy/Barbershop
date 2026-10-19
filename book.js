// Barber Data
const barbers = [
    {
        id: 1,
        name: "Malcom",
        specialty: "Master Barber",
        workingHours: {
            days: [1, 3, 4, 5], // Monday, Wednesday, Thursday, Friday
            start: 9,
            end: 19,
            break: [13, 14]
        }
    },
    {
        id: 2,
        name: "Tony Kroos",
        specialty: "Beard Specialist",
        workingHours: {
            days: [2, 4, 5, 6], // Tuesday, Thursday, Friday, Saturday
            start: 10,
            end: 20,
            break: [14, 15]
        }
    },
    {
        id: 3,
        name: "Luca Modric",
        specialty: "Modern Stylist",
        workingHours: {
            days: [0, 3, 5, 6], // Sunday, Wednesday, Friday, Saturday
            start: 11,
            end: 21,
            break: [15, 16]
        }
    },
    {
        id: 4,
        name: "Megan Stallion",
        specialty: "Wig Implantation",
        workingHours: {
            days: [1, 3, 4, 6],
            start: 11,
            end: 23,
            break: [12, 16]
        }
    },
    {
        id: 5,
        name: "Big Latto",
        specialty: "Braider/Dreadlocks",
        workingHours: {
            days: [2, 4, 5, 6],
            start: 10,
            end: 20,
            break: [14, 15]
        }
    },
    {
        id: 6,
        name: "Aubry Drake Graham",
        specialty: "Fade Expert",
        workingHours: {
            days: [0, 3, 5, 6],
            start: 11,
            end: 21,
            break: [15, 16]
        }
    }
];

// Booking System
let currentDate = new Date();
let selectedBarber = null;
let selectedDate = null;
let selectedTime = null;
const bookings = JSON.parse(localStorage.getItem('bookings')) || {};

// Initialize
function init() {
    renderBarbers();
    renderCalendar(currentDate);
    setupEventListeners();
}

// Barber Selection
function renderBarbers() {
    const grid = document.getElementById('barberGrid');
    grid.innerHTML = barbers.map(barber => `
        <div class="barber-card" data-id="${barber.id}">
            <h3>${barber.name}</h3>
            <p>${barber.specialty}</p>
        </div>
    `).join('');

    grid.addEventListener('click', (e) => {
        const card = e.target.closest('.barber-card');
        if (card) {
            selectedBarber = barbers.find(b => b.id === parseInt(card.dataset.id));
            document.querySelectorAll('.barber-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            renderCalendar(currentDate);
        }
    });
}

// Calendar System
function renderCalendar(date) {
    const calendar = document.getElementById('calendar');
    const monthYear = date.toLocaleString('default', { month: 'long', year: 'numeric' });
    document.getElementById('currentMonth').textContent = monthYear;

    calendar.innerHTML = '';
    
    ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach(day => {
        const header = document.createElement('div');
        header.className = 'calendar-day header';
        header.textContent = day;
        calendar.appendChild(header);
    });

    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const startDay = firstDay.getDay();

    for(let i = 0; i < startDay; i++) {
        calendar.appendChild(createEmptyDay());
    }

    for(let day = 1; day <= daysInMonth; day++) {
        const dayDate = new Date(date.getFullYear(), date.getMonth(), day);
        const dayElement = createDayElement(dayDate, day);
        calendar.appendChild(dayElement);
    }
}

function createDayElement(date, day) {
    const dayElement = document.createElement('div');
    dayElement.className = 'calendar-day';
    dayElement.textContent = day;

    const today = new Date();
    today.setHours(0,0,0,0);
    
    if(date < today) {
        dayElement.classList.add('disabled');
        return dayElement;
    }

    if(selectedBarber) {
        const isAvailable = selectedBarber.workingHours.days.includes(date.getDay());
        const isBooked = bookings[date.toISOString().split('T')[0]]?.includes(selectedBarber.id);

        if(isAvailable && !isBooked) {
            dayElement.classList.add('available');
            dayElement.addEventListener('click', () => selectDate(date));
        } else {
            dayElement.classList.add('disabled');
            if(isBooked) dayElement.classList.add('booked');
        }
    }

    return dayElement;
}

function selectDate(date) {
    selectedDate = date;
    document.querySelectorAll('.calendar-day').forEach(day => day.classList.remove('selected'));
    event.target.classList.add('selected');
    generateTimeSlots();
}

// Time Slots
function generateTimeSlots() {
    const timeGrid = document.getElementById('timeGrid');
    timeGrid.innerHTML = '';
    
    if(!selectedBarber || !selectedDate) return;

    const start = selectedBarber.workingHours.start;
    const end = selectedBarber.workingHours.end;
    const [breakStart, breakEnd] = selectedBarber.workingHours.break;

    for(let hour = start; hour < end; hour++) {
        if(hour >= breakStart && hour < breakEnd) continue;
        
        for(let minutes = 0; minutes < 60; minutes += 30) {
            const time = `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
            const timeSlot = document.createElement('div');
            timeSlot.className = 'time-slot';
            timeSlot.textContent = time;
            
            if(isTimeBooked(time)) {
                timeSlot.classList.add('booked');
            } else {
                timeSlot.addEventListener('click', (e) => selectTime(time, e));
            }
            
            timeGrid.appendChild(timeSlot);
        }
    }
}

function selectTime(time, event) {
    selectedTime = time;
    document.querySelectorAll('.time-slot').forEach(slot => slot.classList.remove('selected'));
    event.target.classList.add('selected');
    updateConfirmation();
}

// Confirmation
function updateConfirmation() {
    const details = document.getElementById('bookingDetails');
    details.innerHTML = `
        <p><strong>Barber:</strong> ${selectedBarber.name}</p>
        <p><strong>Date:</strong> ${selectedDate.toDateString()}</p>
        <p><strong>Time:</strong> ${selectedTime}</p>
    `;
}

// Helpers
function createEmptyDay() {
    return document.createElement('div');
}

function isTimeBooked(time) {
    const key = `${selectedDate.toISOString().split('T')[0]}-${selectedBarber.id}`;
    return bookings[key]?.includes(time);
}

// Event Listeners
function setupEventListeners() {
    document.getElementById('prevMonth').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });

    document.getElementById('nextMonth').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });

    document.getElementById('confirmBtn').addEventListener('click', () => {
        if(selectedBarber && selectedDate && selectedTime) {
            const bookingKey = `${selectedDate.toISOString().split('T')[0]}-${selectedBarber.id}`;
            
            if(!bookings[bookingKey]) bookings[bookingKey] = [];
            bookings[bookingKey].push(selectedTime);
            
            localStorage.setItem('bookings', JSON.stringify(bookings));
            localStorage.setItem('currentBooking', JSON.stringify({
                barber: selectedBarber,
                date: selectedDate.toISOString(),
                time: selectedTime
            }));
            
            window.location.href = 'register.html';
        } else {
            alert('Please select barber, date and time');
        }
    });
}

// Initialize
init();