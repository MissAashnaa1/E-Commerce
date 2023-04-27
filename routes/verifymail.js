const express=require("express")
const fs = require("fs")
const router=express.Router()
const dir="h:\\ECOMMERCE";
const sendEmail=require("../methods/sendEmail")
router.get("/:token",(req,res)=>{
    
    const tokenn=req.params.token;
    console.log(tokenn,"hhhhj")
    fs.readFile(dir + "/data.json", "utf-8", function (err, data) {

            
        info = JSON.parse(data);
        for (let i = 0; i < info.length; i++) {
            if (info[i].token == tokenn) {
                
                info[i].verified= true
                
                    
            }
                
        }
        fs.writeFile(dir + "/data.json", JSON.stringify(info), function (err,data) {
            if(err) console.log(err," < fs write verify email js")
            
            
            res.send("Verified ...")
            return;
        })
    })
})
module.exports=router;