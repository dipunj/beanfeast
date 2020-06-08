# beanfeast

## Standard success response:

```js
status: 200
{
	meta: {
		success: true,
		response: {
			mustShow: true/false,
			title: 'some title',
			message: 'Some success message',
		}
	}
	data: {
		...will depend on the api
	},
}
```

## Standard error message:

```js
status: 400
{
	meta: {
		success: false,
		response: {
			mustShow: true/false,
			title: 'error title',
			message: 'error message'
		}
	}
}
```

## API Doc

```js
// CREATE NEW POOL
/**
 * req.body = {
 * 		maxPoolSize
 * 		fromTime
 * 		toTime
 * 		uniqueIdentifier
 * 		latitude
 * 		longitude
 * }
 *
 */
POST: '/pool/create/new';

// READ the pool's stats (number of people, max capacity, timing)
/**
 * req.params = { poolId }
 * req.body = {
 * 		uniqueIdentifier
 * }
 */
GET: '/pool/status/:poolId';

// UPDATE POOL
// only the creator of the pool can update the pool
/**
 * req.params = { poolId }
 * req.body = {
 * 		maxPoolSize
 * 		fromTime
 * 		toTime
 * 		uniqueIdentifier
 * }
 */
POST: '/pool/update/:poolId';

// CREATES the user/poster to pool, if there is space
/**
 * req.params = { poolId }
 * req.body = {
 * 		uniqueIdentifier,
 * 		latitude,
 * 		longitude
 * }
 */
POST: '/pool/join/:poolId';

// READ: Generates results for the pool.
// Pool must be full to compute result
/**
 * req.params = { poolId }
 *
 * req.body = {
 * 		uniqueIdentifier,
 * 		queryString,
 * 		searchRadius
 * }
 */
GET: '/place/results/:poolId';
```
