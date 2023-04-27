const express=require("express")
const fs = require("fs")
const router=express.Router()
router.get("/", function (req, res) {
    console.log("logout");
    req.session.destroy();
    res.redirect("/")

})
module.exports=router;