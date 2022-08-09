// also will be storing data in cookies (previously set up url mappings)

// write back method:
// cache containing data is updated only and main memory is updated (asynchronously)

module.exports = (postgres_pool:any) => {
	const express = require('express');
	const router = express.Router();

	router.post("/user/", (req:any, res:any, next:any) => { // creates a url to url mapping
		// first we are going to hit the cache than it will be written to the database	
			
	});

	router.get("/user/:uuid", (req:any, res:any, next:any) => { // retrieves a url to url mapping
		// we always read the cache first than it will hit the mongodb database		

	});

	return router;
};
