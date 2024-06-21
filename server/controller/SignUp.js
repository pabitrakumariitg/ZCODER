const fs = require('fs');
const path = require('path');
const SignUp = require('../model/SignUp'); // Import the SignUp model

async function handleLogin(req, res) {
  const body = req.body;
  
  if (!body || !body.userName || !body.password) {
    return res.status(400).json({ msg: 'All fields are required' });
  }

  try {
    // Find a user in the SignUp collection with the provided userName
    const user = await SignUp.findOne({ userName: body.userName });
    
    if (!user) {
      console.error(`User not found: ${body.userName}`);
      return res.status(401).json({ msg: 'Invalid userName or password' });
    }

    // Check if the provided password matches the stored hashed password
    const passwordMatch = user.password === body.password;

    if (!passwordMatch) {
      console.error(`Password mismatch for user: ${body.userName}`);
      return res.status(401).json({ msg: 'Invalid userName or password' });
    }

    // If userName and password match, update currentUser.json
    const currentUser = { username: body.userName };
    const filePath = path.join(__dirname, '..', 'currentUser.json');
    
    fs.writeFile(filePath, JSON.stringify(currentUser), (err) => {
      if (err) {
        console.error('Error writing file:', err);
        return res.status(500).json({ msg: 'Internal server error' });
      }
      // If the file was successfully updated, send a success response
      return res.status(200).json({
        msg: 'Login successful',
        userName: body.userName
      });
    });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ msg: 'Internal server error' });
  }
}

module.exports = {
  handleLogin,
};
