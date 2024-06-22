const fs = require('fs');
const path = require('path');
const SignUp = require('../model/SignUp');
// const currentUser = require("../currentUser.json");

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

    const currentUser = {
      username: body.userName
    };

    const directoryPath = path.join(__dirname, '..');
    const filePath = path.join(directoryPath, 'currentUser.json');

    // Ensure directory exists
    fs.access(directoryPath, fs.constants.F_OK, (dirErr) => {
      if (dirErr) {
        fs.mkdir(directoryPath, { recursive: true }, (mkdirErr) => {
          if (mkdirErr) {
            console.error('Error creating directory:', mkdirErr);
            return res.status(500).json({ msg: 'Internal server error: Could not create directory' });
          }
          writeFile();
        });
      } else {
        writeFile();
      }
    });

    function writeFile() {
      // Check write permissions
      fs.access(directoryPath, fs.constants.W_OK, (writeErr) => {
        if (writeErr) {
          console.error('Write permission error:', writeErr);
          return res.status(500).json({ msg: 'Internal server error: No write permission' });
        }

        // Write file
        fs.writeFile(filePath, JSON.stringify(currentUser), (writeFileErr) => {
          if (writeFileErr) {
            console.error('Error writing file:', writeFileErr);
            return res.status(500).json({ msg: 'Internal server error: Could not write file' });
          }
          return res.status(200).json({
            msg: 'Login successful',
            userName: body.userName
          });
        });
      });
    }

  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ msg: 'Internal server error: Could not complete login' });
  }
}

module.exports = {
  handleLogin,
};
