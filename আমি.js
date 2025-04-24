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







