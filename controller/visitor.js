var express = require('express');
var userModel = require.main.require('./model/userModel');
var router = express.Router();

router.get('/', (req,res)=>{
	res.render('visitor/index');
	//res.send('LOGIN PAGE');

});

router.post('/',(req,res)=>{


	var user={
		uname: req.body.uname,
		password: req.body.password,
		usertype: req.body.usertype
	};

	userModel.validate(user, function(result)
		{
			if(result.length>0){
				req.session.name= req.body.uname;
				req.session.uid= result[0].id;
				
				if(req.body.usertype=="admin")
				{
					res.redirect('/adminhome');
					//res.send("login SUCCESS as ADMIN");
				}
				else if(req.body.usertype=="member")
				{
					res.redirect('/memberhome');
					//res.send("login SUCCESS as MEMBER");	
				}
				
			}
			else{
				//res.send("login failed")
				//alret("Invalid INPUT!!!");
				res.render("visitor/index");
			}
		});
});

module.exports = router;