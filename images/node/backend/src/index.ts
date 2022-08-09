const https = require('https');
const path = require('path');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers'); // uses object destructing
const cookie_parser = require('cookie-parser');

const mongodb = require('mongodb');
const redis = require('redis');
const postgres = require('pg');
const express = require('express');
const app = express();

const argv = yargs(hideBin(process.argv))
.command ('$0 [ip] [port]', 'start the server', (yargs:any) => {
	return yargs
	.positional('ip', {
		describe: 'ip address to listen on',
		default: '0.0.0.0'
	})
	.positional('port', {
		describe: 'port to bind to',
		default: 80
	})
})
.help('h')
.alias('h', 'help')
.argv

async function config_middleware() {
	// initialization of mongodb client
	let mongodb_client:any;
	try {
		mongodb_client = new mongodb.MongoClient('mongodb://127.0.0.1:27017');
		await mongodb_client.connect(); // mongodb client connected
		
	} catch (error) {
		console.error(error);
		mongodb_client.close();

	}

	// initialization of postgres pool
	let postgres_pool:any;
	try {
		postgres_pool = new postgres.Pool({connectionString: 'postgresql://postgres@127.0.0.1:5432'});
	
	} catch (error) {
		console.error(error);
		postgres_pool.end();

	}

	// initialization of redis client
	let redis_client:any = redis.createClient({url: 'redis://127.0.0.1:6379'});	
	await redis_client.connect();

	app.use(express.static(path.resolve(__dirname, '../../frontend/build')));
	app.use(express.json());
	app.use(cookie_parser());
	
	app.use('/*', require('./check')());
	app.get('/:hash_slice', async (req:any, res:any, next:any) => { // retrieves a url to url mapping
    // user will be redirected to according website (https://fqdn/[HASH] that maps to hash
		let url_data:any = await redis_client.get(req.params.hash_slice); // get hash to url mapping

		if (url_data == null) {
			url_data = await mongodb_client.db('short-url').collection('mapping').findOne({hash: req.params.hash_slice}).url;
		}

		if (url_data != null) {
			res.redirect(url_data); // defaults with response of 302
			res.end();
			return;
		}

		res.status(404).end(); // couldn't find hash and url mapping
  });

	const api_version:string = '/api/v1.0/';

	app.use(path.join(api_version, '/mapping/'), require('./mapping')(redis_client, mongodb_client));
	app.use(path.join(api_version, '/users/'), require('./users')(postgres_pool));
	app.use(path.join(api_version, '/dashboard/') , require('./dashboard')(postgres_pool));
}

config_middleware().catch(console.error);
app.listen(argv.port, argv.ip);
