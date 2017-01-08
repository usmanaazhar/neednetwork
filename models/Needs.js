var mongoose = require('mongoose');


// Need Schema
var NeedSchema = mongoose.Schema({
	needtype: {
		type: String,
		index:true
	},
	description: {
		type: String
	},
	status: {
		type: String
	},
	targetamnt: {
		type: Number
	},
	currentamnt: {
		type: String
	},
	createdBy: {
		type: String
	}
});

var Needs = module.exports = mongoose.model('needs', NeedSchema);

module.exports.createNeed = function(newNeed, callback){
	        console.log("Before calling Save");
	        newNeed.save(callback);
	   
}

 var NeedRes = module.exports.getAllNeeds = function(createdBy,callback) {
	var query = {createdBy:createdBy};

	 
	  var needsCol = Needs.find().where("createdBy",createdBy).exec(function (err,docs) {
	  	//console.log(docs.reverse());
	  	docs.reverse();
	  	callback(err,docs);
	  });
	 console.log("after query");
	  //console.log(JSON.stringify(needsCol));

	  //return needsCol;
	}

	


