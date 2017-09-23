# mongo-singleton
A singleton instance for MongoDB with fallbacks for unspecified Mongo URL (great for testing)

Provides a fairly simple way to manage multiple database connections in one spot, essentially pooling them.

The implementation uses Promises, and you will need ES6 support (this was written for NodeJS, so that should not be an issue).

There are a couple of ways you can specify the URL to connect to:
- Just send the URL over as a parameter when you require the module:
```js
(MongoSingleton)('mongodb://localhost:27017/test')
				.then(([db, url]) => {
					// The url gives the URL that was connected to, in case you are 
          // using an environment variable and want to log it
          console.log('Connected to ' + url);
          
          db.doSomethingInteresting();
				})
				.catch(err => {
					console.error('Dammit');
				});
```
- Pass nothing, and let it pick up the MongoDB URL from the environment (process.env.MONGO_URL):
```js
(MongoSingleton)()
				.then(([db, url]) => {
          console.log('Connected to ' + url);
          
          db.doSomethingInteresting();
				})
				.catch(err => {
					console.error('Dammit');
				});
```

Bear in mind that this is implemented using promises, so you might want to add an await in front of the call if you intend to put any code afterwards that requires the database connection.

```js
await (MongoSingleton)()
  .then(([db,url]) => {
    ...
  });
  .catch(err => {
    ...
  });
```
