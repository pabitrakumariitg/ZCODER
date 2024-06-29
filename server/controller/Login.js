const SignUp = require('../model/SignUp'); // Import the SignUp model

async function handleLogin(req, res) {
  const { userName, password } = req.body;

  if (!userName || !password) {
    return res.status(400).json({ msg: 'All fields are required' });
  }

  try {
    // Find a user in the SignUp collection with the provided userName
    const user = await SignUp.findOne({ userName });

    // If no user is found, return an error
    if (!user) {
      return res.status(401).json({ msg: 'Invalid userName or password' });
    }

    // Check if the provided password matches the stored password
    const passwordMatch = user.password === password; // Assuming password is stored in plaintext, otherwise, you need to hash and compare

    if (!passwordMatch) {
      return res.status(401).json({ msg: 'Invalid userName or password' });
    }

    // If userName and password match, send a success response with the username
    return res.status(200).json({
      msg: 'Login successful',
      userName
    });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ msg: 'Internal server error' });
  }
}

module.exports = {
  handleLogin,
};
