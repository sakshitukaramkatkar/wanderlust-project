const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");

const mongo_url= "mongodb://127.0.0.1:27017/wonderlust";

main()
.then(()=>{
    console.log("connected to DB");
}).catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(mongo_url);
};


const initDB = async ()=>{
    await Listing.deleteMany({});
       initdata.data = initdata.data.map((obj)=>({
        ...obj,
        owner:"6a96f8de34c2acc2386af7a9"
    }));
    await Listing.insertMany(initdata.data);
    console.log("data was initialized");
};
initDB();