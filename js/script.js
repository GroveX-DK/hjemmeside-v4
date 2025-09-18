// Global state
let bookings = [];
let isProcessing = false;
let bookingIdCounter = 0;

// Customer data
const customers = ['Lars Hansen', 'Mette Nielsen', 'Anders Andersen', 'Sofie Larsen'];
const times = ['19:00', '19:30', '20:00', '20:30'];

// DOM elements
const beltPattern = document.getElementById('beltPattern');
const bookingItemsContainer = document.getElementById('bookingItemsContainer');
const simulateButton = document.getElementById('simulateButton');
const buttonText = document.getElementById('buttonText');

// Stage dots
const stageDots = [
    document.getElementById('stageDot1'),
    document.getElementById('stageDot2'),
    document.getElementById('stageDot3')
];

// Stage cards
const stageCards = [
    document.getElementById('stageCard1'),
    document.getElementById('stageCard2'),
    document.getElementById('stageCard3')
];

// Utility functions
function getRandomCustomer() {
    return customers[Math.floor(Math.random() * customers.length)];
}

function getRandomTime() {
    return times[Math.floor(Math.random() * times.length)];
}

function getRandomPartySize() {
    return Math.floor(Math.random() * 6) + 2;
}

function getStagePosition(status) {
    // Values adjusted for better visual centering of the booking card.
    switch (status) {
        case 'raw': return 6;
        case 'refined': return 41;
        case 'complete': return 76;
        default: return 6;
    }
}

function getStatusClass(status) {
    switch (status) {
        case 'raw': return 'raw';
        case 'refined': return 'refined';
        case 'complete': return 'complete';
        default: return 'raw';
    }
}

function getStatusText(status) {
    switch (status) {
        case 'raw': return 'RÅ DATA';
        case 'refined': return 'RAFFINERET';
        case 'complete': return 'FÆRDIG';
        default: return status.toUpperCase();
    }
}

// Create booking content based on status
function createBookingContent(booking) {
    switch (booking.status) {
        case 'raw':
            return `
                <div class="booking-details raw">
                    <div style="color: #6b7280;">
                        ${booking.customer} ${booking.time} ${booking.date} ${booking.party}pers
                    </div>
                    <div style="font-size: 0.625rem; color: #9ca3af; font-family: monospace;">
                        input_data: unvalidated
                    </div>
                </div>
            `;
        
        case 'refined':
            return `
                <div class="booking-details refined">
                    <div class="detail-row">
                        <span class="user-icon"></span>
                        <span>${booking.customer}</span>
                    </div>
                    <div class="detail-row">
                        <span class="calendar-icon"></span>
                        <span>${booking.date} kl. ${booking.time}</span>
                    </div>
                    <div>Gæster: ${booking.party}</div>
                </div>
            `;
        
        case 'complete':
            return `
                <div class="booking-details complete">
                    <div class="customer-name">
                        <span class="status-dot"></span>
                        <span style="font-weight: 500;">${booking.customer}</span>
                    </div>
                    <div class="final-details">
                        <div>📅 ${booking.date} kl. ${booking.time}</div>
                        <div>👥 ${booking.party} personer</div>
                        <div>🪑 Bord #12 reserveret</div>
                    </div>
                </div>
            `;
        
        default:
            return '';
    }
}

// Create booking card element
function createBookingCard(booking) {
    const card = document.createElement('div');
    card.className = 'booking-card fade-in';
    card.id = `booking-${booking.id}`;
    card.style.left = `${getStagePosition(booking.status)}%`;
    
    const statusClass = getStatusClass(booking.status);
    const loadingIcon = booking.status === 'refined' && isProcessing ? 
        '<div class="loading-icon"></div>' : '';
    
    card.innerHTML = `
        <div class="booking-card-content">
            <div class="booking-card-header">
                <span class="status-badge ${statusClass}">
                    ${getStatusText(booking.status)}
                </span>
                ${loadingIcon}
            </div>
            ${createBookingContent(booking)}
        </div>
    `;
    
    return card;
}

// Update existing booking card
function updateBookingCard(booking) {
    const card = document.getElementById(`booking-${booking.id}`);
    if (!card) return;
    
    const statusClass = getStatusClass(booking.status);
    const loadingIcon = booking.status === 'refined' && isProcessing ? 
        '<div class="loading-icon"></div>' : '';
    
    // Update position
    card.style.left = `${getStagePosition(booking.status)}%`;
    
    // Update content
    card.innerHTML = `
        <div class="booking-card-content">
            <div class="booking-card-header">
                <span class="status-badge ${statusClass}">
                    ${getStatusText(booking.status)}
                </span>
                ${loadingIcon}
            </div>
            ${createBookingContent(booking)}
        </div>
    `;
}

// Update UI elements based on processing state
function updateProcessingState(processing) {
    isProcessing = processing;
    
    // Update button
    simulateButton.disabled = processing;
    buttonText.textContent = processing ? 'Simulerer...' : 'Simuler';
    
    // Update belt animation
    if (processing) {
        beltPattern.classList.add('animated');
    } else {
        beltPattern.classList.remove('animated');
    }
    
    // Update stage dots
    stageDots.forEach(dot => {
        if (processing) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
    
    // Update stage cards
    stageCards.forEach((card, index) => {
        if (processing) {
            card.classList.add('active');
            if (index === 0) card.classList.add('red');
            if (index === 1) card.classList.add('blue');
            if (index === 2) card.classList.add('green');
        } else {
            card.classList.remove('active', 'red', 'blue', 'green');
        }
    });
}

// Render all booking cards
function renderBookings() {
    // Clear existing cards
    bookingItemsContainer.innerHTML = '';
    
    // Show only last 3 bookings
    const visibleBookings = bookings.slice(-3);
    
    visibleBookings.forEach(booking => {
        const card = createBookingCard(booking);
        bookingItemsContainer.appendChild(card);
    });
}

// Main function to create new booking
function createNewBooking() {
    if (isProcessing) return;
    
    const newBooking = {
        id: ++bookingIdCounter,
        customer: getRandomCustomer(),
        date: 'I dag',
        time: getRandomTime(),
        party: getRandomPartySize(),
        status: 'raw'
    };
    
    // Add booking to array
    bookings.push(newBooking);
    
    // Start processing
    updateProcessingState(true);
    
    // Render initial state
    renderBookings();
    
    // Stage 1: Raw -> Refined (after 3 seconds)
    setTimeout(() => {
        const bookingIndex = bookings.findIndex(b => b.id === newBooking.id);
        if (bookingIndex !== -1) {
            bookings[bookingIndex].status = 'refined';
            updateBookingCard(bookings[bookingIndex]);
        }
    }, 3000);
    
    // Stage 2: Refined -> Complete (after 6 seconds)
    setTimeout(() => {
        const bookingIndex = bookings.findIndex(b => b.id === newBooking.id);
        if (bookingIndex !== -1) {
            bookings[bookingIndex].status = 'complete';
            updateBookingCard(bookings[bookingIndex]);
        }
        
        // Stop processing after 1 more second
        setTimeout(() => {
            updateProcessingState(false);
            // Update all cards to remove loading icons
            renderBookings();
        }, 1000);
    }, 6000);
}

// Initialize the application
function init() {
    updateProcessingState(false);
    renderBookings();
    
    // Add click event listener to button (backup for onclick)
    simulateButton.addEventListener('click', createNewBooking);
}

// Start the application when DOM is ready
document.addEventListener('DOMContentLoaded', init);
