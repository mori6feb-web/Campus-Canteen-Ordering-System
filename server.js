const express = require("express");

const app = express();
const PORT = 3000;

// Form data read karne ke liye
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// HTML, CSS, JS files serve karne ke liye
app.use(express.static("."));

// Temporary users storage
let users = [];

// REGISTER
app.post("/register", (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.send("Please fill all fields.");
    }

    const existingUser = users.find(
        user => user.email === email
    );

    if (existingUser) {
        return res.send("Email already registered.");
    }

    users.push({ name, email, password });

    res.send(`
        <h2>Registration Successful!</h2>
        <p>Welcome, ${name}</p>
        <a href="/login.html">Go to Login</a>
    `);
});

// Server start
app.listen(PORT, () => {
    console.log(
        `Campus Canteen server running at http://localhost:${PORT}`
    );
});
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    const user = users.find(
        u => u.email === email && u.password === password
    );

    if (user) {
        res.json({ success: true });
    } else {
        res.json({
            success: false,
            message: "Invalid email or password"
        });
    }
});