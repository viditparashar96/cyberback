var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
require('dotenv').config()




router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post("/contact",function(req,res,next){
  try {
    const {name,email,subject,message}=req.body
  console.log(name,email,subject,message)

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD
    }
});

  
  var mailOptions = {
    from: email,
    to: process.env.SMTP_MAIL ,
    subject: `Message from ${email}: ${subject}`,
    text: `Name:${name} Message:${message} `
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      res.json({success:true})
      console.log('Email sent: ' + info.response);
    }
  });


  
  } catch (error) {
    console.log(error)
  }
  
})
module.exports = router;
