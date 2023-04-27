const express=require("express")
// const fs = require("fs")
const router=express.Router()
const fs = require("fs")
const dir="h:\\ECOMMERCE";
const multer = require('multer');
const upload = multer({
    dest: "uploads"
})
// const upload2=multer({
//     dest: "public/mybag/uploads"
// })
// router.use(express.urlencoded({ extended: true }))
router.get("/",function (req, res) {
    if (req.session.login) {
        res.render("seller", { name: req.session.name ,phrase:""});
    }
    else {
        res.redirect("/")
    }
})
 router.post("/",upload.single('fileF'), function (req, res) {
        // console.log(req.query)
        console.log(req.body.nameF)
        fs.readFile(dir + "/product_data.json", "utf-8", function (err, data) {
            let info = [];
            let check = false;
            if (data.length != 0) {
                info = JSON.parse(data);
            }
            let theProduct = {
                id:Date.now(),
                productName: req.body.nameF,
                filename: req.file.filename,
                desc: req.body.descF,
                price:req.body.price,
                quantity:req.body.quantity
            }
            // console.log(theProduct, "<<");
            info.push(theProduct)
            fs.writeFile(dir + "/product_data.json", JSON.stringify(info), function (err) {
                if (err) { console.log(err) }
                else {
                    // res.redirect("/")
                    res.render("seller",{ name: req.session.name ,phrase:"Added successfully"});
                }
            })

        })
    })
module.exports=router;