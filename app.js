const HOST = '0.0.0.0';
const PORT = process.env.PORT || 2000;
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.render('index');
});


app.post('/index/send', function (req, res){
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'denniskestone@gmail.com',
            pass: 'arsenalvsmanchester'
        }
    });

    var mailOptions = {
        from: 'dennis kestone <denniskestone@gmail.com>',
        to: 'denniskestone@gmail.com',
        subject: 'Website Submission',
        text: 'You have a submission with the following details...Name:'+ req.body.name +' Email:'+ req.body.Email +' Message: '+ req.body.message,
        html: '<p> You have a submission with the following details...</p><ul><li>Name:'+ req.body.name +'</li><li>Email:'+ req.body.Email +'</li><li>Message:'+ req.body.message +'</li></ul>' 
     };
     transporter.sendMail(mailOptions, function(error, info){
         if(error){
             console.log(error);
             res.redirect('/');
         } else {
                console.log('Message sent:' );
                res.render.alert("sent succesfully");
                res.redirect('/');
         }
     });
     console.log('sent');
});

app.listen(PORT, function(){
    console.log(`Our app is running on port ${ PORT }`);
});