import express, { response } from "express"; // এক্সপ্রেস লাইব্রেরি ইমপোর্ট করা হচ্ছে
const app = express(); // এক্সপ্রেস অ্যাপ্লিকেশন তৈরি করা হচ্ছে
app.use(express.json()); // JSON বডি পার্সিংয়ের জন্য এক্সপ্রেসের বিল্ট-ইন মিডলওয়্যার ব্যবহার করা হচ্ছে

const loginmiddleware = (req, res, next) => { 
console.log(`${req.method} - ${req.url}`); // রিকোয়েস্টের মেথড এবং ইউআরএল লগ করে দেখাবে
next(); // মিডলওয়্যার থেকে পরবর্তী রাউটারে যাওয়ার জন্য next() কল করা হচ্ছে
}

//রিজল্ব আইডি. 

const resolveIndexByUserId = (req,res,next) => {
  const { body, params: { id } } = req; // রিকোয়েস্টের বডি এবং প্যারামিটার থেকে ডাটা বের করা হচ্ছে
  const parsedId = parseInt(id); // প্যারামিটার থেকে আইডি নাম্বারে কনভার্ট করা হচ্ছে
  if (isNaN(parsedId)) return res.sendStatus(400); 
  // যদি আইডি নাম্বার না হয়, তাহলে 400 রেসপন্স পাঠাবে

  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId); 
  // অ্যারে থেকে ইউজারের ইনডেক্স খুঁজবে
  if (findUserIndex === -1) return res.sendStatus(404); 
  // ইউজার না পেলে 404 রেসপন্স দেবে
  req.findUserIndex = findUserIndex; // ইউজারের ইনডেক্স রিকোয়েস্ট অবজেক্টে সংরক্ষণ করা হচ্ছে
  next(); // মিডলওয়্যার থেকে পরবর্তী রাউটারে যাওয়ার জন্য next() কল করা হচ্ছে
  
}

app.use(loginmiddleware); // মিডলওয়্যারকে অ্যাপ্লিকেশনে ব্যবহার করা হচ্ছে 

const PORT = process.env.PORT || 3000; // সার্ভার পোর্ট সেট করা হচ্ছে, ডিফল্ট 3000

// মক ডাটা হিসেবে ইউজারদের একটি অ্যারে তৈরি করা হয়েছে
//এইটা একটা array 
const mockUsers = [
  { id: 1, username: "maria", displayName: "maria" }, // ইউজার ১
  { id: 2, username: "juan", displayName: "juan" }, // ইউজার ২
  { id: 3, username: "pedro", displayName: "pedro" }, // ইউজার ৩
  { id: 4, username: "uu", displayName: "oo" }, // ইউজার ৪
  { id: 5, username: "juan", displayName: "juan" }, // ইউজার ৫
  { id: 6, username: "yo", displayName: "bitch" }, // ইউজার ৬
];

app.get("/", 
  (req, res, next) => {
    console.log("base url"); // রিকোয়েস্টের ইউআরএল লগ করে দেখাবে
    next(); // মিডলওয়্যার থেকে পরবর্তী রাউটারে যাওয়ার জন্য next() কল করা হচ্ছে
  },
  (req, res) => { 
    res.status(201).send({msg:"hi"}); // রেসপন্স হিসেবে 201 স্ট্যাটাস কোড পাঠাবে 
  }
);

app.use(loginmiddleware,(req,res,next)=>{
console.log("finished login");
next();
}); // মিডলওয়্যারকে অ্যাপ্লিকেশনে ব্যবহার করা হচ্ছে

app.get("/api/users", (req, res, next) => {
  console.log(req.query); // রিকোয়েস্টের কুয়েরি প্যারামিটার লগ করে দেখাবে
  const { query: { filter, value } } = req; // কুয়েরি প্যারামিটার থেকে filter এবং value বের করা হচ্ছে

  if (!filter && !value) return res.send(mockUsers); 
  // যদি filter এবং value না থাকে, তাহলে পুরো mockUsers অ্যারে রেসপন্স হিসেবে পাঠাবে

  if (filter && value) {
    return res.send(
      mockUsers.filter((user) => user[filter]?.includes(value))
    );
    // filter এবং value থাকলে mockUsers অ্যারে ফিল্টার করে রেসপন্স পাঠাবে
  }

  return res.send(mockUsers); 
  // ডিফল্টভাবে পুরো mockUsers অ্যারে রেসপন্স হিসেবে পাঠাবে
});

app.post("/api/users", (req, res) => {
  console.log(req.body); // রিকোয়েস্টের বডি লগ করে দেখাবে
  const { body } = req; // রিকোয়েস্টের বডি থেকে ডাটা বের করা হচ্ছে
  const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...req.body }; 
  // নতুন ইউজার তৈরি করা হচ্ছে
  mockUsers.push(newUser); // নতুন ইউজারকে mockUsers অ্যারেতে যোগ করা হচ্ছে
  return res.status(201).send(newUser); // 201 রেসপন্স কোড সহ নতুন ইউজার রিটার্ন করা হচ্ছে
});

app.get("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { findUserIndex } = req; // রিকোয়েস্টের বডি এবং ইনডেক্স বের করা হচ্ছে
  const findUser = mockUsers[findUserIndex]; // ইউজার খুঁজে বের করা হচ্ছে
  if (!findUser) return res.sendStatus(404);
  return res.send(findUser); // ইউজার পাওয়া গেলে রেসপন্স পাঠাবে
});

app.put("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { body, findUserIndex } = req; // রিকোয়েস্টের বডি এবং ইনডেক্স বের করা হচ্ছে
  mockUsers[findUserIndex] = { id: req.params.id, ...body }; 
  // ইউজারের তথ্য আপডেট করা হচ্ছে, এবং সঠিকভাবে id ব্যবহার করা হচ্ছে
  return res.sendStatus(200); 
  // সফল হলে 200 রেসপন্স পাঠাবে
});
app.patch("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { body, findUserIndex } = req; // রিকোয়েস্টের বডি এবং ইনডেক্স বের করা হচ্ছে
  mockUsers[findUserIndex] = { id: req.params.id, ...body }; 
  // ইউজারের তথ্য আপডেট করা হচ্ছে, এবং সঠিকভাবে id ব্যবহার করা হচ্ছে
  return res.sendStatus(200); 
  // সফল হলে 200 রেসপন্স পাঠাবে
});

app.delete("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { body, findUserIndex } = req; // রিকোয়েস্টের বডি এবং ইনডেক্স বের করা হচ্ছে
  mockUsers[findUserIndex] = { id: req.params.id, ...body }; 
  // ইউজারের তথ্য আপডেট করা হচ্ছে, এবং সঠিকভাবে id ব্যবহার করা হচ্ছে
  return res.sendStatus(200); 
  // সফল হলে 200 রেসপন্স পাঠাবে
});













app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); 
  // সার্ভার চালু হলে পোর্ট নম্বর লগ করে দেখাবে
});

