import express from "express";
const app = express();

const PORT = process.env.PORT || 3000;
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

app.get("/api/users",(req,res)=>{
  console.log(req.query);
  const{querry:{filter,value},}=req;
  //when filter and value are undefined 
  if(!filter && !value)res.send(mockUsers);
  if(!filter && !value)res.send(
    mockUsers.filter((user) => user[filter].includes(value))
  );
  return res.send(mockUsers);

})


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

