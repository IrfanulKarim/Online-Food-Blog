var db = require('./db');

module.exports={
	validate: function(user, callback){
		var sql = "select * from user where username='"+user.uname+"' and password='"+user.password+"' and type='"+user.usertype+"'";
		
		db.getResult(sql, function(result){
			callback(result);
		});
	},

	insert: function(user, callback){
		var sql = "insert into user values (null, '"+user.uname+"','"+user.password+"','"+user.usertype+"')";
		db.execute(sql, function(status){
			callback(status);
		});
	},

	get: function(userId, callback){
		var sql = "select * from user where id="+userId;

		db.getResult(sql, function(result){
			callback(result);
		});
	},
	getTution: function(searchT, callback){
		var sql = "select * from tution where name='"+searchT.tname+"'";

		db.getResult(sql, function(results){
			callback(results);
		});
	},



	update: function(user, callback){
		var sql = "update user set username='"+user.uname+"',password='"+user.password+"' where id="+user.id;
		db.execute(sql, function(status){
			callback(status);
		});
	},

	getAllMember: function(callback){
		var sql = "select * from user where type='member'";
		db.getResult(sql, function(results){
			callback(results);
		});
	},

	delete: function(userId, callback){
		var sql = "delete from user where id="+userId;
		db.execute(sql, function(status){
			callback(status);
		});
	},


}