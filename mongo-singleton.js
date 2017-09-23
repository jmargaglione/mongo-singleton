'use strict';

const MongoClient = require('mongodb').MongoClient;

/**
 * Promise resolves a database instance.
 * @param {string} mongoURL   URL to connect to.  If blank, use process.env.MONGO_URL.
 * @returns {*}               Returns a database handle and the URL used to connect
 */
function MongoSingleton(mongoURL) {
	return new Promise((resolve, reject) => {
		try {
			let msg = '';
			let warn = false;
			let log = false;

			// If nothing specified at all, check for MONGO_URL in env
			if (mongoURL === null || mongoURL === undefined || mongoURL.trim() === '') {
				// If nothing specified there either, use localhost
				if (process.env.MONGO_URL === null) {
					msg = 'Nothing specified, connecting to localhost:27017';
					warn = true;
					mongoURL = 'mongodb://localhost:27017/';
				}
				else {
					msg = 'No MongoDB URL passed to MonoSingle, using process.env.MONGO_URL';
					log = true;

					let url = process.env.MONGO_URL;
					mongoURL = url.trim();
				}
			}

			// If we already have an instance, send it back
			if (MongoSingleton.prototype._dbs[mongoURL] !== undefined) {
				resolve([MongoSingleton.prototype._dbs[mongoURL], mongoURL]);
			}

			//if (log) console.log(msg);
			//if (warn) console.warn(msg);

			MongoClient.connect(mongoURL, (err, db) => {
				if (err || db === null) reject(err);
				else {
					// Stash the singleton
					MongoSingleton.prototype._dbs[mongoURL] = db;

					// Return the database handle
					resolve([db, mongoURL]);
				}
			});
		}
		catch(err) {
			reject(err);
		}
	});
}

MongoSingleton.prototype._dbs = {};

module.exports = MongoSingleton;
