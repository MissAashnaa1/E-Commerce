const express=require("express")
const fs = require("fs")
let dir="h:\\ECOMMERCE";
const router=express.Router()
router.post("/",(req,res)=>{
let prodId=req.body.id;

let stock=req.body.stock;

    fs.readFile(dir + "/data.json", "utf-8", function (err, data) {
        let info=[];
        if(data.length!=0){
            info=JSON.parse(data)
            for(let i=0;i<info.length;i++){
                if(req.session.mail==info[i].email){
                    if(info[i].cart.length==0){
                        info[i].cart.push({product:prodId,quantity:1})
                        console.log(21,prodId)
                        res.json({msg:"success"})
                    }
                    else {let check=false;
                        for(let j=0;j<info[i].cart.length;j++){
                            if(info[i].cart[j].product==prodId){
                                check=true;
                                if(info[i].cart[j].quantity>=stock){
                                    res.json({msg:"fail"})
                                    return
                                }
                                info[i].cart[j].quantity++;
                                console.log(29,prodId,info[i].cart[j].quantity)
                                res.json({msg:"success"})
                            }
                        }
                        if(check==false){
                            info[i].cart.push({product:prodId,quantity:1});
                            console.log(34,prodId)
                            res.json({msg:"success"})
                        }
                    }
                }

            }

        }
        fs.writeFile(dir + "/data.json", JSON.stringify(info), function (err) {
            if (err) { console.log(err) }
            else {
           //res.end()
            }
        })
    })
})
module.exports=router;