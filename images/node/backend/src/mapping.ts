const url_regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

module.exports = (redis_client: any, mongodb_client:any) => {
	const crypto = require('crypto');
	const express = require('express');
	const router = express.Router();

	router.post('/', async (req:any, res:any, next:any) => { // creates a url to url mapping
		// first we are going to hit the cache than it will be written to the database
		// basic data retrieved (will probably need to check types and stuff)
		let new_url:any = req.body.data[0];


    // we will need a key generation service to ensure that certain alphanumeric combinations are generated uniquely

		// we will be hashing the url and snipping a chunk off of it as a "unique" identifier
		let hash:any = crypto.createHash('sha512'); // we will be using sha512 (faster on 64 bit hardware)
		hash.update(new_url); // data should of been sent here

		let hash_slice:string = hash.digest('base64url').slice(0,9); // get first 10 characters

		await redis_client.set(hash_slice, new_url);
		await mongodb_client.db('short-url').collection('mapping').insertOne({hash: hash_slice, url: new_url});

		res.status(200).json({status: 'ok', new_url: '127.0.0.1:80/' + hash_slice});
	});

	return router;
};
