


1

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

2






















