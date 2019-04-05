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
	
	res.render('adminhome/index', user);
});

router.get('/profile', (req, res)=>{

	userModel.get(req.session.uid, function(result){

		if(result.length > 0){
			res.render('adminhome/profile', result[0]);
		}
		else{
			res.render('adminhome/index');
		}
	});	
});

router.get('/edit/:id', (req, res)=>{
	//console.log("edit page"+"id");
	userModel.get(req.params.id, function(result){
		if(result.length >0 ){
			res.render('adminhome/edit', result[0]);
		}else{ 
			res.redirect('/adminhome/profile');
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
			res.redirect('/adminhome/profile');
		}else{
			res.render("/adminhome/edit/"+req.params.id);
		}
	});
});

router.get('/showmember', (req, res)=>{

	// var usermember ={

	// 	usertype : req.body.usertype
	// };


	userModel.getAllMember(function(results){

		if(results.length > 0){

			var user = {
				name: req.session.name,
				tList: results
			};

			res.render('adminhome/showmember',user);
		}
		else{
			res.render('adminhome/index');
		}
	});	
});

router.get('/delete/:id', (req, res)=>{

	userModel.get(req.params.id, function(result){
		if(result.length >0 ){
			res.render('adminhome/delete', result[0]);
		}else{
			res.redirect('/adminhome/showmember');
		}
	});
});

router.post('/delete/:id', (req, res)=>{
	
	userModel.delete(req.params.id, function(success){
		if(success){
			res.redirect('/adminhome/showmember');
		}else{
			res.redirect("/adminhome/delete/"+req.params.id);
		}
	});
});




module.exports= router;