// Import required modules
const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const SignUp = require('./model/SignUp'); // Adjust path as per your project structure
const { handleLogin } = require('./handlers/loginHandler'); // Adjust path as per your project structure

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 8000; // Use environment variable for port or default to 8000

// Middleware setup
app.use(express.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: false })); // Parse URL-encoded bodies
app.use(session({
  secret: 'your_secret_key_here', // Change this to a secure random string
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set secure:true if using HTTPS
}));

// MongoDB connection setup
const mongoURI = 'your_mongodb_uri_here'; // Replace with your MongoDB connection URI
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.post('/login', handleLogin); // Handle user login

// Example of protected route that requires authentication
app.get('/profile', (req, res) => {
  if (!req.session.currentUser) {
    return res.status(401).json({ msg: 'Unauthorized' });
  }
  
  const currentUser = req.session.currentUser;
  return res.status(200).json({
    msg: 'Profile fetched successfully',
    currentUser
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is started at PORT:${PORT}`);
});
