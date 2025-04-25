jwt authentication
// JWT টোকেন বানানোর লাইব্রেরি ইনপোর্ট করলাম
const jwt = require('jsonwebtoken');

// Express এর জন্য JWT যাচাই করার middleware ইনপোর্ট করলাম
const expressJwt = require('express-jwt');

// টোকেন বানাতে এবং যাচাই করতে এই সিক্রেট চাবি ব্যবহার করব
const SECRET = 'your-jwt-secret';

// ইউজার লগইন করার সময় টোকেন তৈরি করা হবে
app.post('/login', (req, res) => {
  // এখানে ধরে নিচ্ছি ইউজার ঠিক আছে (বাস্তবে ডাটাবেজ থেকে চেক করতে হয়)
  const user = { id: 1, username: 'admin' };

  // ইউজারের তথ্য দিয়ে JWT টোকেন তৈরি করলাম, যেটা ১ ঘণ্টা চলবে
  const token = jwt.sign(user, SECRET, { expiresIn: '1h' });

  // টোকেন ইউজারকে রেসপন্স হিসেবে পাঠিয়ে দিলাম
  res.json({ token });
});

// এই রাউটটা সিকিউর, এখানে টোকেন ছাড়া কেউ ঢুকতে পারবে না
app.get('/protected', expressJwt({ secret: SECRET }), (req, res) => {
  // টোকেন সঠিক হলে এই ডাটা দেখানো হবে
  res.send('Protected data');
});

// যদি টোকেন ভুল হয় বা না থাকে, তাহলে এখানে এরর ধরবো
app.use((err, req, res, next) => {
  // যদি এরর হয় টোকেন সংক্রান্ত, তাহলে 401 দিয়ে জানিয়ে দিব
  if(err.name === 'UnauthorizedError') {
    res.status(401).send('Invalid token');
  }
});
//…..............……





// express-rate-limit

// JWT টোকেন বানানোর লাইব্রেরি ইনপোর্ট করলাম
const jwt = require('jsonwebtoken');

// Express এর জন্য JWT যাচাই করার middleware ইনপোর্ট করলাম
const expressJwt = require('express-jwt');

// Rate limit middleware ইনপোর্ট করলাম
const rateLimit = require('express-rate-limit');

// টোকেন বানাতে এবং যাচাই করতে এই সিক্রেট চাবি ব্যবহার করব
const SECRET = 'your-jwt-secret';

// Rate limiter তৈরি করলাম: ১ মিনিটে একজন ইউজার ৫বার রিকুয়েস্ট করতে পারবে
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // ১ মিনিট
  max: 5, // সর্বোচ্চ ৫ বার
  message: 'Too many requests, please try again later.' // লিমিট পেরালে এই মেসেজ দিবে
});

// লগইন রাউটে রেট লিমিট অ্যাপ্লাই করলাম
app.post('/login', limiter, (req, res) => {
  // এখানে ধরে নিচ্ছি ইউজার ঠিক আছে (বাস্তবে ডাটাবেজ থেকে চেক করতে হয়)
  const user = { id: 1, username: 'admin' };

  // ইউজারের তথ্য দিয়ে JWT টোকেন তৈরি করলাম, যেটা ১ ঘণ্টা চলবে
  const token = jwt.sign(user, SECRET, { expiresIn: '1h' });

  // টোকেন ইউজারকে রেসপন্স হিসেবে পাঠিয়ে দিলাম
  res.json({ token });
});

// এই রাউটটা সিকিউর, এখানে টোকেন ছাড়া কেউ ঢুকতে পারবে না
app.get('/protected', expressJwt({ secret: SECRET, algorithms: ['HS256'] }), (req, res) => {
  // টোকেন সঠিক হলে এই ডাটা দেখানো হবে
  res.send('Protected data');
});

// যদি টোকেন ভুল হয় বা না থাকে, তাহলে এখানে এরর ধরবো
app.use((err, req, res, next) => {
  // যদি এরর হয় টোকেন সংক্রান্ত, তাহলে 401 দিয়ে জানিয়ে দিব
  if(err.name === 'UnauthorizedError') {
    res.status(401).send('Invalid token');
  }
});
//...................






// Mongoose লাইব্রেরি ইনপোর্ট করলাম (MongoDB এর সাথে কাজ করার জন্য)
const mongoose = require('mongoose');

// MongoDB ডাটাবেসের সাথে কানেকশন করলাম
mongoose.connect('mongodb://localhost:27017/mydb', {
  useNewUrlParser: true,        // নতুন URL পার্সার ব্যবহার করবো
  useUnifiedTopology: true      // ইউনিফাইড টপোলজি চালু করবো (নতুন সিস্টেম)
})
.then(() => console.log('MongoDB connected'))  // কানেকশন সফল হলে মেসেজ দিবে
.catch(err => console.error('Connection error:', err)); // কানেকশনে সমস্যা হলে এরর দেখাবে

// একটি ইউজার মডেল বানালাম (Schema ছাড়াও করা হয়েছে সরলতার জন্য)
const User = mongoose.model('User', {
  name: String,   // ইউজারের নাম স্টোর হবে
  email: String   // ইউজারের ইমেইল স্টোর হবে
});

// POST রাউট তৈরি করলাম: নতুন ইউজার বানানোর জন্য
app.post('/users', async (req, res) => {
  try {
    // ইউজার অবজেক্ট তৈরি করলাম রিকুয়েস্ট থেকে পাওয়া ডেটা দিয়ে
    const user = new User(req.body);

    // ডাটাবেসে সেইভ করলাম
    await user.save();

    // ২০১ মানে: Created. সেইভ সফল হলে ইউজারকে রেসপন্স হিসেবে পাঠালাম
    res.status(201).send(user);
  } catch (err) {
    // কোনো এরর হলে ৪০০ (Bad Request) দিয়ে এরর পাঠালাম
    res.status(400).send(err);
  }
});
///////////////////////////////





 

// supertest লাইব্রেরি দিয়ে HTTP রিকোয়েস্ট পাঠানোর জন্য request ফাংশন আনা হয়েছে
const request = require('supertest');
// অ্যাপের মেইন ফাইল (যেখানে express app বানানো হয়) ইমপোর্ট করা হয়েছে
const app = require('../app');

// describe ব্লকের ভিতরে 'GET /api/users' রুট এর টেস্ট শুরু
describe('GET /api/users', () => {

  // এই টেস্টটা চেক করে সব ইউজার ফিরায় কিনা
  it('should return all users', async () => {
    const res = await request(app)         // app এর উপর রিকোয়েস্ট পাঠানো
      .get('/api/users')                   // GET রিকোয়েস্ট
      .expect(200);                        // HTTP status 200 আশা করা হয়

    expect(Array.isArray(res.body)).toBeTruthy(); // রেসপন্স বডি একটা array কিনা চেক করা হয়
  });

  // এই টেস্টটা চেক করে নতুন ইউজার তৈরি হয় কিনা
  it('should create a new user', async () => {
    const res = await request(app)             // app এর উপর রিকোয়েস্ট পাঠানো
      .post('/api/users')                      // POST রিকোয়েস্ট
      .send({ name: 'John', email: 'john@example.com' }) // ইউজার ডেটা পাঠানো
      .expect(201);                            // HTTP status 201 আশা করা হয় (Created)

    expect(res.body.name).toBe('John');        // রেসপন্স বডিতে name ঠিক আছে কিনা চেক করা হয়
  });

});
////////////////////






