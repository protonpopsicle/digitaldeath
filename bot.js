var Twit = require('twit');
var T = new Twit(require('./config.js'));
var exec = require('child_process').exec,
    child;

function tweetBattery() {
    child = exec("pmset -g batt | egrep \"([0-9]+\%).*\" -o --colour=auto | cut -f1 -d';'",
		 function (error, stdout, stderr) {
		     console.log('stdout: ' + stdout);
		     console.log('stderr: ' + stderr);
		     if (error !== null) {
			 console.log('exec error: ' + error);
		     }

		     T.post('statuses/update', { status: '' + stdout }, function(err, data, response) {
			 console.log(data)
		     })
		 });
}

tweetBattery();
setInterval(tweetBattery, 1000 * 60 * 8);
