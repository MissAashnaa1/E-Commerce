const express=require("express")
const fs = require("fs")
let dir="h:\\ECOMMERCE";
const router=express.Router()
const app = express();
app.use(express.static("upload"))
router.get("/",(req,res)=>{
    if(req.session.login){
    fs.readFile(dir + "/data.json", "utf-8", function (err, dat) {
        let info=[]
        let send=[]
        if(dat.length!=0){
            info=JSON.parse(dat)
            for(let i=0;i<info.length;i++){
                console.log(dat, 12)
                if(info[i].email==req.session.mail){
                    // let cart=info[i].cart//will receive product and its quantity
                    fs.readFile(dir+"/product_data.json","utf-8",(err,data)=>{
                        
                            for(let j=0;j<info[i].cart.length;j++){
                            let products=JSON.parse(data)
                            console.log(products,"dertr")
                            console.log(err,"rejweh")
                            if(info[i].cart.length==0){
                                send=[]
                            }
                            else{

                                for(let k=0;k<products.length;k++){
                                    console.log(info[i].cart[j].product,"er4",products[k].id)
                                    if(info[i].cart[j].product==products[k].id){
                                        console.log("its match")
                                     //   console.log(products[k])
                                        send.push({product:products[k],quantity:info[i].cart[j].quantity})
                                        console.log(products[k],"product[k")
                                        console.log("quantity",info[i].cart[j].quantity)
                                    }
                                    console.log("27")
                                }
                                    
                                }
                            }
                                console.log(send)
                                res.render("mybag",{name:req.session.name,product:send })
                    })
                        return;
                }
                
            }
        }
    
    })
}
else {
    res.redirect("/login")
}
})

module.exports=router;