const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res.status(400).json({ msg: "Invalid Authentication" });
    }
//     When you call jwt.verify(), it does two things:

// Verifies the token is valid (signature, expiry, etc.)

// Decodes the token's payload — which contains your data:

// {
//   id: "684ade684b2356a6418e47a8", // You put this in the token during login/register
//   iat: 1749744973,                // issued at
//   exp: 1749831373                 // expires at
// }
// This decoded payload is passed as user in the callback function:

// (user) => {
//   req.user = user;  //  This means: req.user = { id, iat, exp }
// }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.json(400).json({ msg: "Invalid authentication" });
      //      req = {
      //   headers: { ... },
      //   body: { ... },
      //   params: { ... },
      //   user: { id: "abc123", name: "John" }  // ← added by the auth middleware
      // }

      req.user = user;
      next();
    });
  } catch (err) {
    if (err) return res.json(500).json({ msg: err.message });
  }
};
module.exports = auth