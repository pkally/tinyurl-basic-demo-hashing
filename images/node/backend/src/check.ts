module.exports = () => {
	const crypto = require('crypto');
	const express = require('express');
	const router = express.Router();

	// we will import common files (specifically constants for checking)
	// example: being checking if api version matches

	router.all('*', (req:any, res:any, next:any) => {
		next();
	});

	return router;
}
