var express 		= require('express');
var bodyParser 		= require('body-parser');
var exSession 		= require('express-session');
var cookieParser 	= require('cookie-parser');
var visitor 		= require('./controller/visitor');
var registration 	= require('./controller/registration');
var adminhome 		= require('./controller/adminhome');
var logout 			= require('./controller/logout');
var memberhome 		= require('./controller/memberhome');

var app 			= express();
var port 			= 3000;

app.set('view engine','ejs');

app.use(exSession({secret:'top secret code', saveUninitialized: true, resave: false}));

app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use('/visitor',visitor);
app.use('/registration',registration);
app.use('/adminhome',adminhome);
app.use('/memberhome',memberhome);
app.use('/logout',logout);

app.get('/',(req,res)=>{
	res.send('WELCOME AT ONLINE FOOD BLOG');
});

app.listen(port, ()=>console.log('server started at'+port+'...'));