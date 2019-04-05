var express = require('express');
var userModel= require.main.require('./model/userModel');
var router = express.Router();

router.get('*', function(req, res, next)
	{
		if(req.session.name!=null){
			next();
		}
		else{
			res.redirect('/visitor');
		}
});

router.get('/', (req,res)=>{
	var user ={
		name: req.session.name		
	};
	
	res.render('memberhome/index', user);
});

router.get('/profile', (req, res)=>{

	userModel.get(req.session.uid, function(result){

		if(result.length > 0){
			res.render('memberhome/profile', result[0]);
		}
		else{
			res.render('memberhome/index');
		}
	});	
});

router.get('/edit/:id', (req, res)=>{
	//console.log("edit page"+"id");
	userModel.get(req.params.id, function(result){
		if(result.length >0 ){
			res.render('memberhome/edit', result[0]);
		}else{ 
			res.redirect('/memberhome /profile');
		}
	});
});

router.post('/edit/:id', (req, res)=>{
	
	var user ={
		id: req.params.id,
		uname : req.body.uname,
		password : req.body.password,
		//type : req.body.type
	};
	
	userModel.update(user, function(success){
		if(success){
			res.redirect('/memberhome/profile');
		}else{
			res.render("/memberhome/edit/"+req.params.id);
		}
	});
});


module.exports= router;