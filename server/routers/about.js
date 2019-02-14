const express = require('express');
const mysql = require('mysql');
const router = express.Router();

const connect = mysql.createConnection({
    host : '127.0.0.1',
    port: 3306,
    user:'root',
    password:'ethanHunt@123',
    database:'usersdata'
});
module.exports = () => {

    router.get('/', (req,res) => {

        new Promise((resolve,reject) =>{
            var hobbies;

            connect.query('SELECT * FROM hobbies ORDER BY hobby DESC', (err,rows,columns) => {
                if(err){
                    console.error(err);
                }
                else{
                    hobbies = rows;
                    // console.log(hobbies);
                    // console.log(`Hobby is ${typeof hobbies}`);
                    hobbies.forEach(eachhobby=> {
                        // console.log(eachhobby.hobby);
                    });
                    // console.log(rows);
                    // connect.end();
                    resolve(hobbies);
                }
            });
            

    
        }).then((result) => {
            // console.log(result);
            res.render('about',{
                hobbies : result
            });
            // connect.end();
        }).catch((err) => {
            console.error(err);
        });

        

        
    
    });

    return router;

}

