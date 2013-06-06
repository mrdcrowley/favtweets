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
  , access_token_secret:  'ZvGZnWOtzui010wTBEfN6N3QbkqpxscGS1G5KmpupI'
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
	var username = ''
	res.render('index',
		{ 
			page: 'index',
			title : 'Home'
		}
	)
})

app.get('/user/:username', function (req, res) {
	var username = req.params.username
		, tweetCount = 200

	res.render('tweet',
		{ 
			page: 'tweet',
			title : username
		}
	)
	twit.get('favorites/list', { screen_name: username, count: tweetCount },  function (err, json) {
		number = 1 + Math.floor(Math.random() * tweetCount)
		if (json) {
			if (typeof posts === 'undefined') {
				posts = json
			}
			console.log(json[number])
		} else {
			console.log(err)
			posts = jsonDummy
		}
	})
})

jsonDummy = [ { created_at: 'Sat Jun 01 22:42:12 +0000 2013',
    id: 340961504805404700,
    id_str: '340961504805404672',
    text: 'The politics of the future won\'t be found in the old, failed center. But it will be found in a new middle.',
    source: '<a href="http://twitter.com/download/iphone" rel="nofollow">Twitter for iPhone</a>',
    truncated: false,
    in_reply_to_status_id: null,
    in_reply_to_status_id_str: null,
    in_reply_to_user_id: null,
    in_reply_to_user_id_str: null,
    in_reply_to_screen_name: null,
    user: 
     { id: 14321959,
       id_str: '14321959',
       name: 'umair haque',
       screen_name: 'umairh',
       location: 'london/east coast',
       description: 'author, economist, slayer of zombies.',
       url: 'http://t.co/MgsdKsOPXo',
       entities: [Object],
       protected: false,
       followers_count: 207149,
       friends_count: 1094,
       listed_count: 5565,
       created_at: 'Mon Apr 07 11:32:29 +0000 2008',
       favourites_count: 81,
       utc_offset: -36000,
       time_zone: 'Hawaii',
       geo_enabled: false,
       verified: true,
       statuses_count: 56468,
       lang: 'en',
       contributors_enabled: false,
       is_translator: false,
       profile_background_color: 'C0DEED',
       profile_background_image_url: 'http://a0.twimg.com/images/themes/theme1/bg.png',
       profile_background_image_url_https: 'https://si0.twimg.com/images/themes/theme1/bg.png',
       profile_background_tile: false,
       profile_image_url: 'http://a0.twimg.com/profile_images/129730596/2630509441_944a6ee3e2_m_normal.jpg',
       profile_image_url_https: 'https://si0.twimg.com/profile_images/129730596/2630509441_944a6ee3e2_m_normal.jpg',
       profile_link_color: '0084B4',
       profile_sidebar_border_color: 'C0DEED',
       profile_sidebar_fill_color: 'DDEEF6',
       profile_text_color: '333333',
       profile_use_background_image: true,
       default_profile: true,
       default_profile_image: false,
       following: null,
       follow_request_sent: false,
       notifications: null },
    geo: null,
    coordinates: null,
    place: null,
    contributors: null,
    retweet_count: 16,
    favorite_count: 11,
    entities: { hashtags: [], symbols: [], urls: [], user_mentions: [] },
    favorited: true,
    retweeted: false,
    lang: 'en' }
]

app.listen(3000)