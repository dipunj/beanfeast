# beanfeast

Standard success response:

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

Standard error message:

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
