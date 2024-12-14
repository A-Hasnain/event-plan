let activeUserTab = "availableEvents"; // Default active tab

const renderUserPage = () => {
    app.innerHTML = `
        <nav>
            <button onclick="setUserTab('bookedEvents')" class="${activeUserTab === 'bookedEvents' ? 'active' : ''}">Booked Events</button>
            <button onclick="setUserTab('availableEvents')" class="${activeUserTab === 'availableEvents' ? 'active' : ''}">Available Events</button>
            <button onclick="setUserTab('profile')" class="${activeUserTab === 'profile' ? 'active' : ''}">Profile</button>
        </nav>
        <div id="content"></div>
    `;

    if (activeUserTab === "bookedEvents") renderBookedEvents();
    else if (activeUserTab === "availableEvents") renderAvailableEvents();
    else if (activeUserTab === "profile") renderUserProfile();
};

const setUserTab = (tab) => {
    activeUserTab = tab;
    renderUserPage();
};

const bookEvent = (index) => {
    const data = eventManager.getData();
    const user = eventManager.getCurrentUserData();

    const eventToBook = user.available[index];
    const selectedSeats = parseInt(document.getElementById(`seats-${index}`).value);

    if (!eventManager.bookEvent(eventToBook.name, selectedSeats)) {
        return;
    }

    alert(`You have successfully booked ${selectedSeats} seat(s) for ${eventToBook.name}!`);
    renderUserPage();
};

const renderAvailableEvents = () => {
    const user = eventManager.getCurrentUserData();
    const available = user.available;

    const content = available.map((event, index) => `
        <div class="card">
            <strong>${event.name}</strong><br>
            Seats Available: ${event.seats}
            <div>
                <label for="seats-${index}">Number of Tickets:</label>
                <select id="seats-${index}">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
            </div>
            <button class="btn" onclick="bookEvent(${index})">Book</button>
        </div>
    `).join('');

    document.getElementById("content").innerHTML = content || '<div>No available events.</div>';
};


const renderBookedEvents = () => {
    const user = eventManager.getCurrentUserData();
    const booked = user.booked;

    const content = booked.map((event) => `
        <div class="card">
            <strong>${event.name}</strong><br>
            Seats Booked: ${event.seats}
        </div>
    `).join('');

    document.getElementById("content").innerHTML = content || '<div>No booked events.</div>';
};

const renderUserProfile = () => {
    document.getElementById("content").innerHTML = `
        <div class="card">
            <strong>Name:</strong> ${getCurrentUsername()}<br>
            <button class="btn" onclick="logout()">Logout</button>
        </div>
    `;
};
