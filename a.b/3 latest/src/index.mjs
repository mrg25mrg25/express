import express from "express";
const app = express();

const PORT = process.env.PORT || 3000;
const mockUsers = [
  {id:1,username:"maria",displayName:"maria"},
  {id:2,username:"juan",displayName:"juan"},
  {id:3,username:"pedro",displayName:"pedro"},
 ]

app.get("/", (req, res) => {
  res.send("Hello World");
}); 

app.get("/api/users",(req,res)=>{
  res.send(mockUsers);
})

app.get("/api/users/:id",(req,res)=>{
 console.log(req.params);
 const parsedId = parseInt(req.params.id);
 console.log(parsedId);
 if(isNaN(parsedId)) return res.status(400).send({msg:"bad request "});
 const findUser = mockUsers.find((user)=> user.id === parsedId);
 if(!findUser) return res.sendStatus(404);
 return res.send(findUser);
});

app.listen(PORT , () => {
  console.log(`Server is running on port ${PORT}`);
});

