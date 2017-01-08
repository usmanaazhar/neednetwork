var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var Needs = require('../models/needs');

// Register
router.get('/', function(req, res){
	
	var needsColl = Needs.getAllNeeds(req.user.username,function(err,docs) {
		console.log("in callback");
		var test = docs.reverse();
         console.log(docs);
     //console.log(docs.reverse());
     //res.set("json");
     //res.json(docs); 

     res.render('needs',{needs:docs});
	});
	console.log("this test");
	//console.log(needsColl);
     //var needsColl = [{'needType':'fin','description':'test'},{'needType':'man','description':'test2'}];

	
});
// Register
router.get('/create', function(req, res){
	res.render('needscreation');
});

// Register User
router.post('/create', function(req, res){
	var needtype = req.body.needtype;
	var description = req.body.description;
	var targetamnt = req.body.targetamnt;
	var currentamnt = req.body.currentamnt;
	var status = req.body.status;
    
	// Validation
	req.checkBody('needtype', 'Need Type is required').notEmpty();
	req.checkBody('description', 'Description is required').notEmpty();
	req.checkBody('targetamnt', 'Target Amount  is not valid').isInt();
	req.checkBody('currentamnt', 'Current Amoount is required').isInt();
	req.checkBody('status', 'Status is required').notEmpty();
	console.log("Logged in user name");
	console.log(req.user.username);
	var errors = req.validationErrors();

	if(errors){
		res.render('needs',{
			errors:errors
		});
	} else {
		var newNeed= new Needs({
			needtype: needtype,
			description:description,
			targetamnt:targetamnt,
			currentamnt:currentamnt,
			status:status,
			createdBy: req.user.username
			
		});

		Needs.createNeed(newNeed, function(err, need){
			if(err) throw err;
			console.log(need);
		});

		req.flash('success_msg', 'Need was successfully created ...');

		res.redirect('/needs');
	}
});

router.get('/:createdBy', function(req, res){
	
	var createdBy = req.params.createdBy;
	var needsColl = Needs.getAllNeeds(createdBy,function(err,docs) {
		
		var test = docs.reverse();
         console.log(docs);
     //console.log(docs.reverse());
    // res.set("json");
     //res.json(docs); 
      res.send(docs);
    //res.render('needs',{needs:docs});
	});
	console.log("this test");
	//console.log(needsColl);
     //var needsColl = [{'needType':'fin','description':'test'},{'needType':'man','description':'test2'}];

	
});

module.exports = router;