let activeOrganiserTab = "activeEvents"; // Default active tab

const renderOrganiserPage = () => {
    app.innerHTML = `
        <nav>
            <button onclick="setOrganiserTab('activeEvents')" class="${activeOrganiserTab === 'activeEvents' ? 'active' : ''}">Active Events</button>
            <button onclick="setOrganiserTab('createEvent')" class="${activeOrganiserTab === 'createEvent' ? 'active' : ''}">Create Event</button>
            <button onclick="setOrganiserTab('profile')" class="${activeOrganiserTab === 'profile' ? 'active' : ''}">Profile</button>
        </nav>
        <div id="content"></div>
    `;

    if (activeOrganiserTab === "activeEvents") renderActiveEvents();
    else if (activeOrganiserTab === "createEvent") renderCreateEvent();
    else if (activeOrganiserTab === "profile") renderOrganiserProfile();
};

const setOrganiserTab = (tab) => {
    activeOrganiserTab = tab;
    renderOrganiserPage();
};

const renderActiveEvents = () => {
    const data = getData();
    const activeEvents = data.organisers[getCurrentUsername()].activeEvents;

    const content = activeEvents.map((event) => `
        <div class="card">
            <strong>${event.name}</strong><br>
            Seats Remaining: ${event.seats}<br>
            Description: ${event.description}
        </div>
    `).join('');

    document.getElementById("content").innerHTML =
        content || '<div>No active events available.</div>';
};

const renderCreateEvent = () => {
    const username = getCurrentUsername();

    // Check if the logged-in user is an organizer
    if (!["CSN", "Junoon"].includes(username)) {
        alert("You are not authorized to create events.");
        return;
    }

    document.getElementById("content").innerHTML = `
        <form onsubmit="createEvent(event)">
            <label for="eventName">Event Name:</label>
            <input type="text" id="eventName" placeholder="Enter event name" required><br>
            <label for="eventDescription">Description:</label>
            <input type="text" id="eventDescription" placeholder="Enter description" required><br>
            <label for="eventSeats">Seats:</label>
            <input type="number" id="eventSeats" placeholder="Enter number of seats" required><br>
            <button type="submit" class="btn">Create Event</button>
            <button type="button" class="btn" onclick="renderActiveEvents()">Cancel</button>
        </form>
    `;
};

const createEvent = (e) => {
    e.preventDefault();

    const name = document.getElementById("eventName").value.trim();
    const description = document.getElementById("eventDescription").value.trim();
    const seats = parseInt(document.getElementById("eventSeats").value);

    if (!name || !description || isNaN(seats) || seats <= 0) {
        alert("Please fill out all fields correctly.");
        return;
    }

    const newEvent = { name, description, seats };

    // Use eventManager to create the event globally
    eventManager.createEvent(getCurrentUsername(), newEvent);

    alert("Event created successfully!");
    renderActiveEvents(); // Refresh the active events page for the organizer
};

const renderOrganiserProfile = () => {
    document.getElementById("content").innerHTML = `
        <div class="card">
            <strong>Name:</strong> ${getCurrentUsername()}<br>
            <button class="btn" onclick="logout()">Logout</button>
        </div>
    `;
};
