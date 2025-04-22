import express, { response } from "express"; // এক্সপ্রেস লাইব্রেরি ইমপোর্ট করা হচ্ছে
const app = express(); // এক্সপ্রেস অ্যাপ্লিকেশন তৈরি করা হচ্ছে
app.use(express.json()); // JSON বডি পার্সিংয়ের জন্য এক্সপ্রেসের বিল্ট-ইন মিডলওয়্যার ব্যবহার করা হচ্ছে

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

app.get("/", (req, res) => {
  res.send("Hello World"); // রুট রাউটে "Hello World" রেসপন্স পাঠানো হচ্ছে
});

app.get("/api/users", (req, res) => {
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

app.get("/api/users/:id", (req, res) => {
  console.log(req.params); // রিকোয়েস্ট প্যারামিটার লগ করে দেখাবে
  const parsedId = parseInt(req.params.id); // প্যারামিটার থেকে আইডি নাম্বারে কনভার্ট করা হচ্ছে
  console.log(parsedId); // কনভার্ট হওয়া আইডি লগ করে দেখাবে

  if (isNaN(parsedId)) return res.status(400).send({ msg: "bad request" }); 
  // যদি আইডি নাম্বার না হয়, তাহলে 400 রেসপন্স পাঠাবে

  const findUser = mockUsers.find((user) => user.id === parsedId); 
  // অ্যারে থেকে আইডি ম্যাচ করে ইউজার খুঁজবে
  if (!findUser) return res.sendStatus(404); 
  // ইউজার না পেলে 404 রেসপন্স দেবে

  return res.send(findUser); 
  // ইউজার পেলে তা রেসপন্স হিসেবে পাঠাবে
});

app.put("/api/users/:id", (req, res) => {
  const { body, params: { id } } = req; // রিকোয়েস্টের বডি এবং প্যারামিটার থেকে ডাটা বের করা হচ্ছে
  const parsedId = parseInt(id); // প্যারামিটার থেকে আইডি নাম্বারে কনভার্ট করা হচ্ছে
  if (isNaN(parsedId)) return res.sendStatus(400); 
  // যদি আইডি নাম্বার না হয়, তাহলে 400 রেসপন্স পাঠাবে

  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId); 
  // অ্যারে থেকে ইউজারের ইনডেক্স খুঁজবে
  if (findUserIndex === -1) return res.sendStatus(404); 
  // ইউজার না পেলে 404 রেসপন্স দেবে

  mockUsers[findUserIndex] = { id: parsedId, ...body }; 
  // ইউজারের তথ্য আপডেট করা হচ্ছে
  return res.sendStatus(200); 
  // সফল হলে 200 রেসপন্স পাঠাবে
});

app.patch("/api/users/:id", (req, res) => {
  const { body, params: { id } } = req; // রিকোয়েস্টের বডি এবং প্যারামিটার থেকে ডাটা বের করা হচ্ছে
  const parsedId = parseInt(id); // প্যারামিটার থেকে আইডি নাম্বারে কনভার্ট করা হচ্ছে
  if (isNaN(parsedId)) return res.sendStatus(400); 
  // যদি আইডি নাম্বার না হয়, তাহলে 400 রেসপন্স পাঠাবে

  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId); 
  // অ্যারে থেকে ইউজারের ইনডেক্স খুঁজবে
  if (findUserIndex === -1) return res.sendStatus(404); 
  // ইউজার না পেলে 404 রেসপন্স দেবে
  // সাধারণত array  তে  কোন কিছু খুঁজে না পেলে -1 রিটার্ন করে।

  mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body }; 
  // ইউজারের তথ্য আংশিক আপডেট করা হচ্ছে
  return res.sendStatus(200); 
  // সফল হলে 200 রেসপন্স পাঠাবে
});



//ইউজারকে ডিলিট করার জন্য API তৈরি করা হচ্ছে
app.delete("/api/users/:id", (req, res) => {
  const {
    params: { id },
  } = req; // রিকোয়েস্টের প্যারামিটার থেকে আইডি বের করা হচ্ছে
  const parsedId = parseInt(id); // প্যারামিটার থেকে আইডি নাম্বারে কনভার্ট করা হচ্ছে
  if (isNaN(parsedId)) return res.sendStatus(400); 
  // যদি parsedId সংখ্যায় রূপান্তর করা না যায় (NaN হয়), 
  // তাহলে ক্লায়েন্টকে 400 Bad Request স্ট্যাটাস কোড রিটার্ন করো।

  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
  // mockUsers অ্যারে থেকে প্রথম ইউজারের ইনডেক্স খুঁজে বের করা হচ্ছে, 
  // যার id parsedId এর সমান। যদি না পাওয়া যায়, তাহলে -1 রিটার্ন হবে।

  if (findUserIndex === -1) return res.sendStatus(404); 
  // যদি findUserIndex -1 হয়, তাহলে ইউজার পাওয়া যায়নি,
  // তাই 404 Not Found স্ট্যাটাস কোড রিটার্ন করো।

  mockUsers.splice(findUserIndex, 1); 
  // mockUsers অ্যারে থেকে ইউজারকে রিমুভ করা হচ্ছে। 
  // findUserIndex থেকে শুরু করে ১টি এলিমেন্ট রিমুভ করা হবে।

  return res.sendStatus(200); 
  // ইউজার সফলভাবে ডিলিট হলে 200 OK স্ট্যাটাস কোড রিটার্ন করো।
});

















app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); 
  // সার্ভার চালু হলে পোর্ট নম্বর লগ করে দেখাবে
});

