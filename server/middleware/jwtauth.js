// const jwt = require('jsonwebtoken');
// const JWT_SECRET = process.env.JWT_SECRET;

// function authenticateToken(req, res, next) {
//   const token = req.header('Authorization')?.split(' ')[1];
//   if (!token) return res.status(401).json({ msg: "Access Denied" });

//   try {
//     const verified = jwt.verify(token, JWT_SECRET);
//     req.user = verified;
//     next();
//   } catch (error) {
//     res.status(400).json({ msg: "Invalid Token" });
//   }
// }

// module.exports = authenticateToken;
