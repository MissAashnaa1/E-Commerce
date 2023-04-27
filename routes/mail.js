const express=require("express")
const router=express.Router()
const fs = require("fs")


/*
const Mailjet = require('node-mailjet')

const mailjet = new Mailjet({
  apiKey:"220c5c95d84300689d9f43b1bb911d0d",
  apiSecret:"5a14fd5326534bde6125471727113e48"
})

router.get("/",(req,res)=>{
console.log("hiiii")
console.log(req.body,"<re.body")
// res.send('hi')
  const request = mailjet.post('send', { version: 'v3.1' }).request({
    Messages: [
      {
        From: {
          Email: 'missaashnaa1@gmail.com',
          Name: 'Aashnaa goswami',
        },
        To: [
          {
            Email: 'missaashnaa7@gmail.com',
            Name: 'aashnaa g',

          }
        ],
        TemplateID: 1,
        TemplateLanguage: true,
        Subject: 'Your email flight plan! iodepiew',
        HTMLPart:'<h1>Good morning</h1>',
      },
    ],
  })
  request
    .then(result => {
      console.log(result)
    })
    .catch(err => {
      console.log("sw",err.statusCode)
    })

    res.send("mail testing")
})




module.exports=router;

*/



/**
 *
 * This call sends a message to one recipient.
 *
 */

