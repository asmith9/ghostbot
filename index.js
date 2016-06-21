
var irc = require("irc"); 

var config = {
	server: "irc.rizon.net",
	channels: ["##pasta"],
	ignoreList: ["CummyPawsBot", "Combot", "PastaBot", "cuckbot", "kekbot", "pepebot", "katbot"],
	nick: "ghost_bot",
	userName: "username",
	realName: "man",
	nickservEnabled: true,
	nickservPass: "pass"
}

var bot = new irc.Client(config.server, config.nick, config)
	function pause(milliseconds) {
		var dt = new Date();
		while ((new Date()) - dt <= milliseconds) { /* Do nothing */ }
	}

bot.addListener("message", function(from, to, message) {
	if (config.ignoreList.indexOf(from) >= 0){ return false }
		var man
	message.split(" ").forEach(function(element){
		word = element.replace(/[^a-zA-Z]+/g, '')
		
		if (message.indexOf('spook')>-1
		   ){man=message;}
	
	});
	function loop(n) {
		if (n>0) {
		   setTimeout(function()
		   { bot.say(to,n); loop(n -1 );}, 3000);
		   } else {
			   bot.say(to,"boo! ^.~");
		   }
		}
		loop(5);
/*	for (var i = 5; i > 1; i--) {
		setTimeout((i) => {
		bot.say(to, i);
		}, i * 3000, i);
	}
*/
});

bot.addListener("ctcp-version", function(from, to, message) {
	bot.notice(from, "\01VERSION ayylmao\01")
});

bot.on("error", function(message) {
	return console.log(message)
})

bot.on("registered", function() {
	if (config.nickservEnabled) {
		bot.say("NickServ", "IDENTIFY " + config.nickservPass)
	}
})

bot.on("invite", function(channel, nick) {
	bot.join(channel)
	return bot.say(channel, nick + " here lies ghost bot, rip jones McCucky!")
})

