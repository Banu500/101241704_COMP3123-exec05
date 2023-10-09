const express = require('express');
const app = express();
const router = express.Router();

// Serve a static HTML file named home.html with a welcome message
router.get('/home', (req, res) => {
  res.sendFile(__dirname + '/home.html');
});

// Simulate user data
const userData = [
  { username: 'user1', password: 'password1' },
  { username: 'user2', password: 'password2' },
  // Add more user data as needed
];

// Modify /login route to accept username and password as query string parameters
// and validate them against the userData array
router.get('/login', (req, res) => {
  const { username, password } = req.query;
  const user = userData.find((u) => u.username === username);

  if (!user) {
    res.json({ status: false, message: "Username is invalid" });
  } else if (user.password !== password) {
    res.json({ status: false, message: "Password is invalid" });
  } else {
    res.json({ status: true, message: "User is valid" });
  }
});

// Modify /logout route to accept username as a parameter and display a message in HTML format
router.get('/logout/:username', (req, res) => {
  const { username } = req.params;
  res.send(`<b>${username} successfully logged out.</b>`);
});

app.use('/', router);

app.listen(process.env.PORT || 8081, () => {
  console.log('Web Server is listening at port ' + (process.env.PORT || 8081));
});
