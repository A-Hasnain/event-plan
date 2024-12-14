const eventManager = {
    getData: () => JSON.parse(localStorage.getItem("eventBookingData")),
    saveData: (data) => localStorage.setItem("eventBookingData", JSON.stringify(data)),

    createEvent: (organiserName, event) => {
        const data = eventManager.getData();

        // Add the event to the organizer's active events
        data.organisers[organiserName].activeEvents.push(event);

        // Add the event to all users' available events if it doesn't already exist
        Object.values(data.users).forEach((user) => {
            if (!user.available.some((e) => e.name === event.name)) {
                user.available.push({ ...event });
            }
        });

        eventManager.saveData(data); // Save the updated data globally
    },

    bookEvent: (eventName, selectedSeats) => {
        const data = eventManager.getData();
        const currentUser = getCurrentUsername();
        const user = data.users[currentUser];

        // Find the event in the user's available list
        const eventToBook = user.available.find((event) => event.name === eventName);

        if (!eventToBook || eventToBook.seats < selectedSeats) {
            alert("Not enough seats available!");
            return false;
        }

        // Deduct seats globally
        eventToBook.seats -= selectedSeats;

        // Add or update the event in the user's booked list
        const existingBooking = user.booked.find((event) => event.name === eventName);
        if (existingBooking) {
            existingBooking.seats += selectedSeats;
        } else {
            user.booked.push({ ...eventToBook, seats: selectedSeats });
        }

        // Update seat counts across all users
        Object.values(data.users).forEach((u) => {
            const availableEvent = u.available.find((event) => event.name === eventName);
            if (availableEvent) availableEvent.seats = eventToBook.seats;
        });

        // Update seat counts in organizers' active events
        Object.values(data.organisers).forEach((organiser) => {
            const activeEvent = organiser.activeEvents.find((event) => event.name === eventName);
            if (activeEvent) activeEvent.seats = eventToBook.seats;
        });

        eventManager.saveData(data);
        return true;
    },

    getCurrentUserData: () => {
        const data = eventManager.getData();
        const username = getCurrentUsername();
        return data.users[username] || data.organisers[username];
    }
};
