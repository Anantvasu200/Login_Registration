const express = require('express');
const path = require('path');
const hbs = require('hbs');
const app = express();
require('./db/conn');
const Register = require('./models/register')
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set paths
const static_path = path.join(__dirname, '../public');
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

// Middleware
app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);

// Register partials with hbs
hbs.registerPartials(partials_path);

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/register', (req, res) => {
    res.render('register');
});

// create a new user in our database
app.post('/register', async (req, res) => {
    try {
        const { firstname, lastname, email, linkedin, mobile_number, password, confirm_password } = req.body;

        console.log('Received data:', req.body); // Log the received data for debugging

        if (password !== confirm_password) {
            return res.status(400).send({ error: "Passwords do not match" });
        }

        const registerUser = new Register({
            firstname,
            lastname,
            email,
            linkedin,
            mobile_number,
            password,
        });

        const result = await registerUser.save();

        res.status(201).send({ message: "User registered successfully", result });
    } catch (error) {
        console.error("Something went wrong:", error);
        res.status(400).send({ error: "Registration failed", details: error.message });
    }
});

// Login route
app.get('/login', (req, res) => {
    res.status(404).send('<h1>Oops! Page Not Found</h1>');
});



app.use((req, res) => {
    res.status(404).render('404', {
        errorMsg: 'Oops! Page Not Found'
    });
})

app.listen(port, () => {
    console.log('Server is running on port', port);
});
