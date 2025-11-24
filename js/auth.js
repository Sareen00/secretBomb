// --- AUTH SYSTEM ---
// Users structure in localStorage:
// {
//   username: "pseudo1",
//   password: "hashedpw",
//   results: [ ... ] // array of {score, date}
// }

function getUsers() {
    return JSON.parse(localStorage.getItem("users") || "{}");
}

function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}

function hash(str) {
    return btoa(str); // simple hash (base64) pour un projet perso
}

function signup(username, password) {
    const users = getUsers();

    if (users[username]) {
        return { success: false, message: "Ce pseudo existe déjà." };
    }

    users[username] = {
        password: hash(password),
        results: []
    };

    saveUsers(users);
    return { success: true, message: "Compte créé !" };
}

function login(username, password) {
    const users = getUsers();

    if (!users[username]) {
        return { success: false, message: "Utilisateur introuvable." };
    }

    if (users[username].password !== hash(password)) {
        return { success: false, message: "Mot de passe incorrect." };
    }

    // Sauvegarde la session courante
    localStorage.setItem("currentUser", username);
    return { success: true, message: "Connexion réussie !" };
}

function getCurrentUser() {
    return localStorage.getItem("currentUser");
}

function logout() {
    localStorage.removeItem("currentUser");
}

function saveResult(score) {
    const username = getCurrentUser();
    const users = getUsers();

    users[username].results.push({
        score,
        date: new Date().toISOString()
    });

    saveUsers(users);
}
