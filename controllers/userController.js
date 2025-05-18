const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const { OAuth2Client } = require("google-auth-library");

const usersPath = path.join(__dirname, "../users.json");
const CLIENT_ID = "341114379232-2lbs9hdca4onrhdtp4t4fmgt36aq69ji.apps.googleusercontent.com"; // ← à remplacer !
const client = new OAuth2Client(CLIENT_ID);

function readUsers() {
    return new Promise((resolve, reject) => {
        fs.readFile(usersPath, "utf8", (err, data) => {
            if (err) return reject(err);
            resolve(JSON.parse(data));
        });
    });
}
function writeUsers(users) {
    return new Promise((resolve, reject) => {
        fs.writeFile(usersPath, JSON.stringify(users, null, 2), "utf8", (err) => {
            if (err) return reject(err);
            resolve();
        });
    });
}

// --------------------- SIGNUP ---------------------
exports.signup = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password)
        return res.status(400).json({ error: "Missing username or password" });
    try {
        const users = await readUsers();
        if (users.find(u => u.username === username))
            return res.status(400).json({ error: "Username already exists" });

        const hash = await bcrypt.hash(password, 10);
        users.push({ username, password: hash, google: false });
        await writeUsers(users);

        // Token bidon pour la démo
        res.json({ username, token: "fake-token-" + Date.now() });
    } catch (err) {
        res.status(500).json({ error: "Signup failed" });
    }
};

// --------------------- LOGIN ---------------------
exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const users = await readUsers();
        const user = users.find(u => u.username === username);
        if (!user) return res.status(400).json({ error: "User not found" });

        if (user.google) {
            return res.status(400).json({ error: "Utilisateur enregistré avec Google. Veuillez utiliser Google." });
        }
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return res.status(400).json({ error: "Wrong password" });

        res.json({ username, token: "fake-token-" + Date.now() });
    } catch (err) {
        res.status(500).json({ error: "Login failed" });
    }
};

// --------------------- GOOGLE LOGIN ---------------------
exports.googleLogin = async (req, res) => {
    const { credential } = req.body;
    if (!credential) return res.status(400).json({ error: "Missing credential" });

    try {
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const email = payload.email;
        const name = payload.name || email.split("@")[0];

        let users = await readUsers();
        let user = users.find(u => u.username === email);
        if (!user) {
            user = { username: email, password: null, google: true };
            users.push(user);
            await writeUsers(users);
        }
        res.json({ username: email, token: "google-token-" + Date.now() });
    } catch (err) {
        res.status(401).json({ error: "Google token invalid" });
    }
};
