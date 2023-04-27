const express=require("express")
const fs = require("fs")
const router=express.Router()
const dir="h:\\ECOMMERCE";
const sendEmail=require("../methods/sendEmail")


router.get("/",(req, res) =>{
    if(req.session.login){
        
    res.render("changeps",{name:req.session.name,msg:"Enter Previous and new password!",clr:1})
    }
    else {
        res.redirect("/login")
    }
});
router.post("/",(req,res)=>{
    let oldp = req.body.oldp
    let newp = req.body.newp

    let h = false;
    let info = [];
    if (oldp == "" || oldp.trim().length == 0) {
        res.render("changeps.ejs", {name:req.session.name, msg:"old password field must not be empty!",clr:2 })
        return
    }
    else if (newp == "" || newp.trim().length == 0) {
        res.render("changeps.ejs", { name:req.session.name,msg: "new password field must not be empty!",clr:2 })
        return;
    }
    else {
        fs.readFile(dir + "/data.json", "utf-8", function (err, data) {

            
                info = JSON.parse(data);
                for (let i = 0; i < info.length; i++) {
                    if (info[i].email == req.session.mail) {
                        h = true;
                        if (info[i].password == oldp) {
                            h=false;
                            info[i].password= newp
                            sendEmail(req.session.mail,"YOur PAssWord Has Been Updated Successfully",1,function(err,data){
                                fs.writeFile(dir + "/data.json", JSON.stringify(info), function (err) {
                                    res.render("changeps.ejs", { name:req.session.name,msg: "Password successfully changed ",clr:3 })
                                    return;
                                })
                        })
                            
                        }
                        
                    }
                }
                if (h == true) {
                    res.render("changeps.ejs", {name:req.session.name, msg: "Old password not entered correctly",clr:2 })
            }
        })
    }
})//mail vla kam rhta bs


module.exports=router;