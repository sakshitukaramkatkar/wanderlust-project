const express = require("express");
const router = express.Router();
//post
//Index 
router.get("/",(req,res)=>{
    res.send("get for post"); 
});

//Show 
router.get("/:id",(req,res)=>{
    res.send("show route for post");
});

//post 
router.post("/",(req,res)=>{
    res.send("post for post");
});

//delete 
router.delete("/:id",(req,res)=>{
    res.send("delete route for post");
});


module.exports =router;