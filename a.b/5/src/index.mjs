import express from "express";
const app = express();
app.use(express.json()); // JSON বডি পার্সিংয়ের জন্য এক্সপ্রেসের বিল্ট-ইন মিডলওয়্যার ব্যবহার করা হচ্ছে


const PORT = process.env.PORT || 3000;

// মক ডাটা হিসেবে ইউজারদের একটি অ্যারে তৈরি করা হয়েছে
// এই অ্যারেটি পরে API রেসপন্স হিসেবে ব্যবহার করা হবে
const mockUsers = [
  {id:1,username:"maria",displayName:"maria"},
  {id:2,username:"juan",displayName:"juan"},
  {id:3,username:"pedro",displayName:"pedro"},
  {id:4,username:"uu",displayName:"oo"},
  {id:5,username:"juan",displayName:"juan"},
  {id:6,username:"yo",displayName:"bitch"},
 ]

app.get("/", (req, res) => {
 
  res.send("Hello World");
}); 

app.get("/api/users", (req, res) => {
  console.log(req.query); // রিকোয়েস্টের কুয়েরি প্যারামিটার লগ করে দেখাবে
  const { query: { filter, value } } = req; // কুয়েরি প্যারামিটার থেকে filter এবং value বের করবে

  if (!filter && !value) return res.send(mockUsers); 
  // যদি filter এবং value না থাকে, তাহলে পুরো mockUsers অ্যারে রেসপন্স হিসেবে পাঠাবে
  if (filter && value) {
    return res.send(
      mockUsers.filter((user) => user[filter]?.includes(value))
    );
    // যদি filter এবং value থাকে, তাহলে mockUsers অ্যারে ফিল্টার করে রেসপন্স পাঠাবে
    // যেখানে filter অনুযায়ী প্রপার্টি value এর সাথে মিলে যায়
  }
  return res.send(mockUsers); 
  // ডিফল্টভাবে পুরো mockUsers অ্যারে রেসপন্স হিসেবে পাঠাবে
});

app.post("/api/users", (req, res) => {
console.log(req.body); // রিকোয়েস্টের বডি লগ করে দেখাবে
const {body}=req; // রিকোয়েস্টের বডি থেকে ডাটা বের করবে
const newUser = {id:mockUsers[mockUsers.length-1].id+1,...req.body} // নতুন ইউজার তৈরি করবে
mockUsers.push(newUser); // নতুন ইউজারকে mockUsers অ্যারেতে যোগ করবে
return res.status(201).send(newUser);// রেসপন্স হিসেবে 200 পাঠাবে
});



app.get("/api/users/:id", (req, res) => {
  console.log(req.params); // { id: '1' } (রিকোয়েস্ট প্যারামিটার লগ করে দেখবে)
  const parsedId = parseInt(req.params.id); // স্ট্রিংকে নাম্বারে কনভার্ট করে
  console.log(parsedId); // কনভার্ট হওয়া আইডি লগ করে দেখবে

  if (isNaN(parsedId)) return res.status(400).send({ msg: "bad request" }); // যদি আইডি নাম্বার না হয়

  const findUser = mockUsers.find((user) => user.id === parsedId); // অ্যারে থেকে আইডি ম্যাচ করে ইউজার খুঁজবে
  if (!findUser) return res.sendStatus(404); // ইউজার না পেলে 404 রেসপন্স দেবে

  return res.send(findUser); // ইউজার পেলে তা রেসপন্স হিসেবে পাঠাবে
});






















app.listen(PORT , () => {
  console.log(`Server is running on port ${PORT}`);
});

