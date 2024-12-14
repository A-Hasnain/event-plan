const initializeData = () => {
    const initialData = {
        users: {
            Hasnain: { booked: [], available: [], role: "user" },
            Aman: { booked: [], available: [], role: "user" }
        },
        organisers: {
            CSN: {
                activeEvents: [
                    { name: "Tech Talk", description: "Latest in Tech", seats: 50 }
                ],
                role: "organiser"
            },
            Junoon: {
                activeEvents: [
                    { name: "Music Fest", description: "An evening of fun", seats: 50 }
                ],
                role: "organiser"
            }
        }
    };

    // Sync default events to users
    Object.values(initialData.organisers).forEach((organiser) => {
        organiser.activeEvents.forEach((event) => {
            Object.values(initialData.users).forEach((user) => {
                user.available.push({ ...event });
            });
        });
    });

    return initialData;
};

// Reinitialize data if localStorage is empty
if (!localStorage.getItem("eventBookingData")) {
    localStorage.setItem("eventBookingData", JSON.stringify(initializeData()));
}

const getData = () => JSON.parse(localStorage.getItem("eventBookingData"));
const saveData = (data) => localStorage.setItem("eventBookingData", JSON.stringify(data));
