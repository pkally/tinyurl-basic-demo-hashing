module.exports = (postgres_pool:any) => {
	const express = require('express');
	const router = express.Router();

	router.post("/dashboard/", (req:any, res:any, next:any) => { // creates a url to url mapping
		// first we are going to hit the cache than it will be written to the database	
			
	});

	return router;
};
