const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn ,isOwner,validateListing} = require("../middleware.js");


//INDEX ROUTE
router.get("/", wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
}));

// New Route
router.get("/new", isLoggedIn, (req, res) => {
    res.render("listings/new.ejs");
});

//Create Route
router.post("/", isLoggedIn,validateListing, 
    wrapAsync(async (req, res, next) => {
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success","New listing created successfully!");
    res.redirect("/listings");
})
);

//SHOW ROUTE
router.get("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
    .populate({
        path: "reviews",
        populate: {
            path: "author"
        },
    })
    .populate("owner");
   if(!listing){
     req.flash("error"," listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
}));

//Edit Route
router.get("/:id/edit",isLoggedIn ,isOwner,   wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
     req.flash("error"," listing you requested for xoes not exist!");
      return res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });
}));

//update route
router.put("/:id",isLoggedIn, isOwner, validateListing,
    wrapAsync(async (req, res) => {
   
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
     req.flash("success"," listing updated successfully!");
    res.redirect(`/listings/${id}`);
}));

//Delete Route
router.delete("/:id", isLoggedIn,isOwner, wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
     req.flash("success","listing deleted successfully!");
    res.redirect("/listings");
}));

module.exports =router;