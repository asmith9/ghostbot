
var irc = require("irc"); 

var config = {
	server: "irc.rizon.net",
	channels: ["#pasta"],
	ignoreList: ["CummyPawsBot", "Combot", "PastaBot", "cuckbot", "kekbot", "pepebot", "katbot"],
	nick: "usernick",
	userName: "username",
	realName: "man",
	nickservEnabled: true,
	nickservPass: "userpass"
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
	pause(3000);
	bot.say(to, '5')
	pause(3000);
	bot.say(to, '4')
	pause(3000);
	bot.say(to, '3')
	pause(3000);
	bot.say(to, '2')
	pause(3000);
	bot.say(to, '1')
	pause(3000);
	bot.say(to, "boo! ^.~")
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

