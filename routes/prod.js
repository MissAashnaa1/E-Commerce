const express=require("express")
const router=express.Router()
const dir="h:\\ECOMMERCE";
const fs = require("fs")
const multer = require('multer');
const upload = multer({
    dest: "upload"
})
router.get("/", function (req, res) {
    let send=[];
    let info=[];
    fs.readFile(dir + "/product_data.json", "utf-8", function (err, data) {
        info = JSON.parse(data);
        
        if (data.length == 0) {
            send = [];
            info = [];
        }
        else {
            info = JSON.parse(data)
            let c = req.session.curr + 5;
            while (req.session.curr < info.length && req.session.curr < c) {
                send.push(info[req.session.curr++]);
            }
        }
        // console.log(send)
        res.json({send:send});
    })
})
 module.exports=router;