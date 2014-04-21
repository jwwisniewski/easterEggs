var express = require('express');
var params = require('express-params');

var app = express();
params.extend(app);

app.param('min', /^[0-9]{1,}$/);
app.param('max', /^[0-9]{1,}$/);
app.param('limit', /^[0-9]{1,}$/);

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

app.get('/basket/:min/:max/:limit', function(req, res) {

	console.log('Request for a basket incomming');

	var basket = [];
	
	var basketLenght = getRandomInt(1, parseInt(req.params.limit), true);

	while (basket.length < basketLenght) {
		var newValue = getRandomInt(parseInt(req.params.min), parseInt(req.params.max), false);
		if (basket.indexOf(newValue) === -1) {
			basket[basket.length] = newValue;
		} else {
			console.log('Duplicate: %d', newValue);
		}
	}

	console.log('Min: %d, max: %d, limit: %d, basket length: %d', req.params.min, req.params.max, req.params.limit, basket.length);

	res.header('Access-Control-Allow-Origin', '*');
	res.send(JSON.stringify(basket));
})

var server = app.listen(3000, function() {
	console.log('Listening on port %d', server.address().port);
});
