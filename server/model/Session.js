const mongoose = require('mongoose');
const sessionSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  // Add other session-related fields as needed
});
const Session = mongoose.model('Session', sessionSchema);
