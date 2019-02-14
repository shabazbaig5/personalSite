const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const bodyParser = require('body-parser');
const nodeMailer = require('nodemailer');

// var hobbies;

const connect = mysql.createConnection({
    host : '127.0.0.1',
    port: 3306,
    user:'root',
    password:'ethanHunt@123',
    database:'usersdata'
});

router.use(bodyParser.urlencoded({extended:false}));


module.exports = () => {

    router.get('/', (req,res) => {


        res.render('contact');

        // await getRows();
        // connect.end();
        // console.log(`after printing the rows this statement will be printed`);
    });



    router.get('/hobbies',(req,res) => {

        getRows = () => {
            return new Promise((resolve,reject) => {
                connect.query('SELECT * FROM hobbies', (err,rows,columns) => {
                    if(err){
                        console.error(err);
                    }
                    else{
                        console.log(rows);
                        resolve(rows);
                        // connect.end()
                        
                    }
                });
            });

        }

        renderPage = async() => {

            let hobbies = await getRows();
            console.log("now it will print after the rows are printed");
            res.send(hobbies);
            // connect.end();
        
        }
        renderPage();
    });

    router.post('/', (req,res) => {
        // console.log(req.body.name);
        // console.log(req.body.email);
        new Promise((resolve,reject) => {

            let transporter = nodeMailer.createTransport({
                service: 'gmail',
                // host: "smtp.ethereal.email",
                // port: 587,
                // secure: false, // true for 465, false for other ports
                auth: {
                  user: `shabazbaig5@gmail.com`, // generated ethereal user
                  pass: `youdontknowwhoiam` // generated ethereal password
                }
              });
    
            let mailOptions = {
              from: `${req.body.name} <shabazbaig5@gmail.com>`, // sender address
              to: `${req.body.email}`, // list of receivers
              subject: "Contact", // Subject line
              text: `Hey whatsup!!! from ${req.body.name}`, // plain text body
              html: `<b>Hey ${req.body.name} wants to get in touch with you </b>`// html body
            };

            let email = transporter.sendMail(mailOptions);
            resolve(email);

        }).then((result) => {
            // console.log("Message sent: %s", info.messageId);
            // // Preview only available when sending through an Ethereal account
            // console.log("Preview URL: %s", nodeMailer.getTestMessageUrl(info));
            console.log(result.messageId);
            console.log(result.envelope.to);
            res.send('Ethan Hunt will get in touch with you');

        }).catch((err) =>{
            console.error(err);
        });
       
        // let info = transporter.sendMail(mailOptions);
         

    });

    
    
    return router;

}