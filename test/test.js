"use strict";

/**
 * Make sure you have an environment variable in your env named MONGO_URL set to
 * mongodb://localhost:2017/testEnv
 *
 * And of course, mongodb should be running on localhost!
 */

var expect    = require("chai").expect;
var MongoSingleton = require('../mongo-singleton');

describe('MongoSingleton', function () {
	describe('connectWithURL', function () {
		it('should connect to a database named test on localhost', async function () {
			await (MongoSingleton)('mongodb://localhost:27017/test')
				.then(([db, url]) => {
					expect(url).to.equal('mongodb://localhost:27017/test');
				})
				.catch(err => {
					throw err;
				});
		});
	});

	describe('connectWithEnv', function () {
		it('should connect to a database based on process.env.MONGO_URL', async function () {
			await (MongoSingleton)()
				.then(([db, url]) => {
					expect(url).to.equal('mongodb://localhost:27017/testEnv');
				})
				.catch(err => {
					throw err;
				});
		});
	});

	describe('connectToExisting', function () {
		it('should connect to a database named test on localhost', async function () {
			await (MongoSingleton)()
				.then(([db, url]) => {
					expect(url).to.equal('mongodb://localhost:27017/testEnv');
				})
				.catch(err => {
					throw err;
				});
		});
	});

	describe('connectWithoutURL', function () {
		it('should connect to a database named test on localhost', async function () {
			await (MongoSingleton)(null)
				.then(([db, url]) => {
					expect(url).to.equal('mongodb://localhost:27017/testEnv');
				})
				.catch(err => {
					throw err;
				});
		});
	});


});
