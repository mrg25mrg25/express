import express from "express";
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World");
}); 

app.get("/api/users",(req,res)=>{
  res.send([{id:1,username:"maria",displayName:"maria"},
    {id:2,username:"juan",displayName:"juan"},
    {id:3,username:"pedro",displayName:"pedro"},
   ]);
})

app.get("/api/users/:id",(req,res)=>{
  const users = [
    {id:1,username:"maria",displayName:"maria"},
    {id:2,username:"juan",displayName:"juan"},
    {id:3,username:"pedro",displayName:"pedro"}
  ];
  
  const user = users.find(u => u.id === parseInt(req.params.id));
  
  if (!user) {
    return res.status(404).send({ error: "User not found" });
  }
  
  res.send(user);
});

app.listen(PORT , () => {
  console.log(`Server is running on port ${PORT}`);
});

