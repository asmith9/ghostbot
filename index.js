
var irc = require("irc"); 

var config = {
	server: "irc.rizon.net",
	channels: ["##pasta"],
	ignoreList: ["CummyPawsBot", "Combot", "PastaBot", "cuckbot", "kekbot", "pepebot", "katbot"],
	nick: "usernick",
	userName: "username",
	realName: "realname",
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
		
		if (message.indexOf('DRAGON')>-1
		   || message.indexOf('DRAGONS')>-1
		   || message.indexOf('DRAG-ONS')>-1
		   || message.indexOf('..dragons')>-1
		   ){man=message;}
	
	});
//	pause(3000);
	bot.say(to, message)

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
	return bot.say(channel, nick + " has invited me here, enjoy man!")
})
