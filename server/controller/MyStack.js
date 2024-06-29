const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key'; // Replace with your actual secret key

// Function to decode JWT token and extract username
function getUsernameFromToken(token) {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded.username; // Assuming JWT payload has a 'username' field
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
}

async function handleMyStack(req, res) {
  try {
    const token = req.headers.authorization.split(' ')[1]; // Assuming JWT token is passed in Authorization header

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const username = getUsernameFromToken(token);

    if (!username) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    console.log(`Looking for questions for user: ${username}`);

    // Find user questions, limit to 5, and sort by timeOfCreation in descending order (most recent first)
    const userQuestions = await UploadedQuestion.find({ username }).sort({
      timeOfCreation: -1,
    });

    if (!Array.isArray(userQuestions) || userQuestions.length === 0) {
      console.log(`No questions found for user: ${username}`);
      return res.status(404).json({ message: 'No questions found for this user.' });
    }

    console.log('Found questions:', userQuestions);
    res.status(200).json(userQuestions);
  } catch (error) {
    console.error('Error fetching user questions:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = {
  handleMyStack,
};
