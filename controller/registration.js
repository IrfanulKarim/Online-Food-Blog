var express = require('express');
var userModel = require.main.require('./model/userModel');
var router = express.Router();

router.get('/', (req,res)=>{
	res.render('registration/index');
	//res.send('LOGIN PAGE');

});

router.post('/',(req,res)=>{

	var user={
		uname: req.body.uname,
		password: req.body.password,
		usertype: req.body.usertype
	};

	userModel.insert(user, function(success){
		if(success){
			res.redirect('/visitor');
		}else{
			res.render("/registration/index");
		}
	});
});

module.exports = router;