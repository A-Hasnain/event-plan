let currentUsername = JSON.parse(sessionStorage.getItem("currentUsername")) || ""; // Persist global state

const setCurrentUsername = (username) => {
    currentUsername = username;
    sessionStorage.setItem("currentUsername", JSON.stringify(currentUsername)); // Store in sessionStorage
};

const getCurrentUsername = () => {
    return JSON.parse(sessionStorage.getItem("currentUsername")) || currentUsername;
};

// Render the initial login page
const renderLoginPage = () => {
    app.innerHTML = `
        <div class="header">Login as</div>
        <button class="btn" onclick="renderUserLogin()">User</button>
        <button class="btn" onclick="renderOrganiserLogin()">Organiser</button>
    `;
};

// Render user login options
const renderUserLogin = () => {
    app.innerHTML = `
        <div class="header">Select User</div>
        <button class="btn" onclick="loginUser('Hasnain')">Hasnain</button>
        <button class="btn" onclick="loginUser('Aman')">Aman</button>
    `;
};

// Render organizer login options
const renderOrganiserLogin = () => {
    app.innerHTML = `
        <div class="header">Select Organiser</div>
        <button class="btn" onclick="loginOrganiser('CSN')">CSN</button>
        <button class="btn" onclick="loginOrganiser('Junoon')">Junoon</button>
    `;
};

// Handle user login
const loginUser = (user) => {
    setCurrentUsername(user);
    renderUserPage();
};

// Handle organizer login
const loginOrganiser = (organiser) => {
    setCurrentUsername(organiser);
    renderOrganiserPage();
};

// Handle logout
const logout = () => {
    currentUsername = "";
    sessionStorage.removeItem("currentUsername"); // Clear session data
    renderLoginPage(); // Redirect to the login page
};


// Retain user state on page load
const retainState = () => {
    currentUsername = getCurrentUsername();
    if (currentUsername) {
        if (["Hasnain", "Aman"].includes(currentUsername)) {
            renderUserPage();
        } else if (["CSN", "Junoon"].includes(currentUsername)) {
            renderOrganiserPage();
        } else {
            // If username is invalid, redirect to login
            currentUsername = "";
            sessionStorage.removeItem("currentUsername");
            renderLoginPage();
        }
    } else {
        renderLoginPage();
    }
};

// Initialize app on page load
retainState();