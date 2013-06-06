 /*
 * Module dependencies
 */

var express = require('express')
	, stylus = require('stylus')
	, nib = require('nib')
	, Twit = require('twit')

var app = express()
function compile(str, path) {
	return stylus(str)
		.set('filename', path)
		.use(nib());
}

var twit = new Twit({
    consumer_key:         ''
  , consumer_secret:      ''
  , access_token:         ''
  , access_token_secret:  ''
})


app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(express.logger('dev'))
app.use(stylus.middleware(
	{ src: __dirname + '/public'
		, compile: compile
	}
))
app.use(express.static(__dirname + '/public'))

app.get('/', function (req, res) {
	res.render('index',
		{ title : 'Home' }
	)
})

app.get('/user/:username', function (req, res) {
	var username = req.params.username
		, tweetCount = 200

	res.render('index',
		{ title : username }
	)
	twit.get('favorites/list', { screen_name: username, count: tweetCount },  function (err, json) {
		if (json) {
			number = 1 + Math.floor(Math.random() * tweetCount)
			if (typeof posts === 'undefined') {
				posts = json
			}
			console.log(json[number])
		} else {
			console.log(err)
		}
	})
})

app.listen(3000)