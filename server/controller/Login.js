const SignUp = require('../model/SignUp');
const session = require('express-session');

async function handleLogin(req, res) {
  const { userName, password } = req.body;

  if (!userName || !password) {
    return res.status(400).json({ msg: 'All fields are required' });
  }

  try {
    const user = await SignUp.findOne({ userName });

    if (!user || user.password !== password) {
      return res.status(401).json({ msg: 'Invalid userName or password' });
    }

    // Store user information in session
    req.session.currentUser = {
      username: userName
    };

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
