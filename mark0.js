


1
basic express server

const express = require('express');
const app = express();

// Body parse করা
app.use(express.json());

// Home Page Route
app.get('/', (req, res) => {
  res.send('Home Page');
});

// About Page Route
app.get('/about', (req, res) => {
  res.send('About Us');
});

// Dynamic Route with Params
app.get('/user/:id', (req, res) => {
  res.send(`User ID: ${req.params.id}`);
});

// Query Params
app.get('/search', (req, res) => {
  res.send(`Searched: ${req.query.name}`);
});

// POST Request
app.post('/add', (req, res) => {
  const data = req.body;
  res.json({ message: 'Data Received', data });
});

// Static Files Serve
app.use(express.static('public'));

// 404 Not Found
app.use((req, res) => {
  res.status(404).send('Page Not Found');
});

// Server Listening
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
/////////////////////////??????//////

2 router alada kora. routes/user  

const express = require('express');
const router = express.Router();

router.get('/:id', (req, res) => {
  res.send(`User ID is ${req.params.id}`);
});

router.post('/', (req, res) => {
  res.send('User created');
});

module.exports = router;

...............
3 server.js

const express = require('express');
const app = express();
const userRouter = require('./routes/user');

app.use(express.json());
app.use('/user', userRouter);

app.listen(3000, () => {
  console.log('Server running...');
});

............


4. authentication 


const jwt = require('jsonwebtoken');

app.post('/login', (req, res) => {
  const user = { id: 1, username: 'osho' };
  const token = jwt.sign(user, 'secretkey');
  res.json({ token });
});

// Middleware to protect routes
function verifyToken(req, res, next) {
  const bearer = req.headers['authorization'];
  if (typeof bearer !== 'undefined') {
    const token = bearer.split(' ')[1];
    jwt.verify(token, 'secretkey', (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        next();
      }
    });
  } else {
    res.sendStatus(403);
  }
}

// Protected Route
app.get('/profile', verifyToken, (req, res) => {
  res.send('Profile accessed');
});
.............
 























