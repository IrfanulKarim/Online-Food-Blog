var express = require('express');
var router = express.Router();

router.get('/', (req, res)=>{
	
	req.session.name = null;
	res.redirect('/visitor');

});

module.exports = router;