const SignUp = require('../model/SignUp');
const { getUser, setUser } = require('../currentUserContext');

async function handleLogin(req, res) {
  const body = req.body;
  if (!body || !body.userName || !body.password) {
    return res.status(400).json({ msg: 'All fields are required' });
  }

  try {
    const user = await SignUp.findOne({ userName: body.userName });

    if (!user) {
      return res.status(401).json({ msg: 'Invalid userName or password' });
    }

    const passwordMatch = user.password === body.password;

    if (!passwordMatch) {
      return res.status(401).json({ msg: 'Invalid userName or password' });
    }

    // Update user in the currentUserContext
    setUser({ username: body.userName });

    return res.status(200).json({
      msg: 'Login successful',
      userName: body.userName,
    });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ msg: 'Internal server error' });
  }
}

module.exports = {
  handleLogin,
};
