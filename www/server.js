var bodyParser = require('body-parser');
var express = require('express');
var app = express();

var request = require('request');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/abc', function (req, res) {
	res.send("hello world");
});

app.post('/searchPlace', function (req, res) {
	
	console.log('++++++++++' + req.body.query + '+++++++++');

	//var url = 'https://developers.zomato.com/api/v2.1/search?entity_id='+ req.body.entity_id +'&entity_type=' + req.body.entity_type + '&q=' + req.body.query + '&count=5';
	var url = 'https://developers.zomato.com/api/v2.1/search?lat=18.592139&lon=73.757416&q=' + req.body.query + '&count=5';
	var options = {
	  url: url,
	  headers: {
	    'Accept': 'application/json',
	    'user-key': '6657bfa3b94b74edfed03c18c88c2653'
	  }
	};

	function callback(error, response, body) {
	  if (!error && response.statusCode == 200) {
	    body = JSON.parse(body);
	    //console.log(body.restaurants);
	    body.restaurants.forEach(function(item){
	    	console.log(item.restaurant.name);
	    })
	    res.send(body);
	  }
	}

	request(options, callback);

	//res.send(req.body);

	// request({
	//   url: 'https://developers.zomato.com/api/v2.1/search?entity_id=5&entity_type=city&q=mezza',
	//   headers: {
	//     'Accept': 'application/json',
	//     'user-key': '6657bfa3b94b74edfed03c18c88c2653'
	//   }, function(error, response, body) {
	//   	console.log(body);
	//   	res1.send(body);
	//   });

	/*request("http://52.77.252.183:9090/", function(error, response, body) {
	  console.log(body);
	  res1.send(body);
	});*/


});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});