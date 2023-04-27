const express=require("express")
const fs = require("fs")
let dir="h:\\ECOMMERCE";
const router=express.Router()
router.post("/",(req,res)=>{
    fs.readFile(dir + "/data.json", "utf-8", function (err, dat) {
        let info=[]
        let send=[]
        if(dat.length!=0){
            info=JSON.parse(dat)
            for(let i=0;i<info.length;i++){
                if(info[i].email==req.session.mail){
                    // let cart=info[i].cart//will receive product and its quantity
                    let id=req.body.id;
                            for(let j=0;j<info[i].cart.length;j++){
                                if(info[i].cart[j].product==id){
                                    info[i].cart.splice(j,1)
                                    fs.writeFile(dir + "/data.json", JSON.stringify(info), function (err) {
                                        if (err) { console.log(err) }
                                        else {
                                            res.end()
                                            return
                                        }
                                    })
                                }
                             }
                              
                }
                
            }
        }
    })
    res.end()
})
module.exports=router;