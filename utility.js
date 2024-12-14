const updateGlobalSeats = (eventName, seatsChanged, isBooking) => {
    const data = getData();
    const adjustSeats = isBooking ? -seatsChanged : seatsChanged;

    // Update seats in organizers' active events
    Object.values(data.organisers).forEach((organiser) => {
        organiser.activeEvents.forEach((event) => {
            if (event.name === eventName) {
                event.seats += adjustSeats;
            }
        });
    });

    // Update seats in users' available events
    Object.values(data.users).forEach((user) => {
        user.available.forEach((event) => {
            if (event.name === eventName) {
                event.seats += adjustSeats;
            }
        });
    });

    saveData(data); // Save updated data
};

const addNewEventToUsers = (event) => {
    const data = getData();
    Object.values(data.users).forEach((user) => {
        if (!user.available.some((ev) => ev.name === event.name)) {
            user.available.push({ ...event });
        }
    });
    saveData(data);
};
