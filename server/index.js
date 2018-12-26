const express = require('express');
const aboutRouer = require('./routers/about');
const app  = express();



app.use(express.static('public'));

app.set('view engine', 'pug');

app.set('views', __dirname + '/views');

app.use('/about',aboutRouer());

app.get('/', (req,res) => {

    res.render('home');

});



app.listen(3000, () => {
    
    console.log("listening to port 3000");

});
