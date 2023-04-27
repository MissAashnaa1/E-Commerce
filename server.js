const express = require("express");
const fs = require("fs")// to work with file module
const session = require("express-session")//
const { urlencoded, json } = require("express");
const exp = require("constants");
// var nam;

const dir="h:\\ECOMMERCE";

// test change

 
const app = express();
const port = 4000;
const multer = require('multer');

const upload = multer({
    dest: "uploads"
})
app.use(session({
    secret: 'keyboard cat',//encoding
    resave: false,//for every request to    server even if req is from same user or browser it resetssession cookie 
    saveUninitialized: false,//if something not added then no sessions would b created
    //cookie sec//the session cookie will be considered third party and blocked by your browser
}))

app.use(express.static("uploads"));//middleware serves static files

app.use(express.static("public"));//middleware serves static files
app.use(express.static("public/mybag/uploads"));//middleware serves static files
const loginRoute = require('./routes/login')
const signupRoute=require('./routes/signup')
const logoutRoute=require('./routes/logout')
const prodRoute=require('./routes/prod')
const sellerRoute=require('./routes/seller')
// const mailRoute=require('./routes/mail')
const cartRoute=require("./routes/cart")
const bagRoute=require("./routes/mybag")
const delitemRoute=require("./routes/delitem")
const incitemRoute=require("./routes/incitem")
const decitemRoute=require("./routes/decitem")
const changeRoute=require("./routes/changeps")
const verifyRoute=require("./routes/verifymail")

app.use(express.urlencoded({ extended: true }))//precises that the req. body object will contain values of any type instead of just strings
app.use(express.json())
app.use("/css", express.static(dir + '/node_modules/bootstrap/dist/css'))
app.set("view engine", "ejs");

// dedde83339cc92d2ca78e38bc076ef7a

app.get("/", function (req, res) {
   
    if (req.session.login) {
        let info = [];
        let send = [];
        fs.readFile( "h:\\ECOMMERCE"+ "/product_data.json", "utf-8", function (err, data) {
          //  info = JSON.parse(data);
            if (data.length == 0) {
                send = [];
                info = [];
            }
            else {
                info = JSON.parse(data)
                req.session.curr = 0;
                let c = req.session.curr + 5;
                while (req.session.curr < info.length && req.session.curr < c) {
                    send.push(info[req.session.curr++]);
                }
            }
            res.render("index", { name: req.session.name, product: send });
        })
    }
    else {

        res.redirect("/login")
    }
})
app.use("/login", loginRoute);
app.use("/signup", signupRoute);
app.use("/prod",prodRoute);
app.use("/seller",sellerRoute);
app.use("/logout",logoutRoute);
app.use("/verifymail",verifyRoute)
app.use("/addtocart",cartRoute)
app.use("/mybag",bagRoute)
app.use("/delitem",delitemRoute)
app.use("/incitem",incitemRoute)
app.use("/decitem",decitemRoute)
app.use("/changeps",changeRoute)

app.listen(port, function () {
        console.log("at port number" + port)
})
