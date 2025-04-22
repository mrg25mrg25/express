
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

app.get("/api/products",(req,res)=>{
  res.send([{id:1,name:"producto 1",price:100},
    {id:2,name:"producto 2",price:200},
    {id:3,name:"producto 3",price:300},
   ]);
});



app.listen(PORT , () => {
  console.log(`Server is running on port ${PORT}`);
});

