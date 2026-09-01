const express = require("express");
const router = express.Router();


//Index Route
router.get("/",(req,res)=>{
    res.send("get for user");
});



//Show  Route
router.get("/:id",(req,res)=>{
    res.send("show route for users");
});

//post users
router.post("/",(req,res)=>{
    res.send("post for users");
});

//delete Route
router.delete("/:id",(req,res)=>{
    res.send("delete route for users");
});

module.exports =router;