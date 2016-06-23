
var irc = require("irc"); 

var config = {
	server: "irc.rizon.net",
	channels: ["##pasta"],
	ignoreList: ["CummyPawsBot", "Combot", "PastaBot", "cuckbot", "kekbot", "pepebot", "katbot"],
	nick: "ghost_bot",
	userName: "username",
	realName: "man",
	nickservEnabled: true,
	nickservPass: "userpass"
}
var bot = new irc.Client(config.server, config.nick, config)
bot.addListener("message", function(from, to, message) {
	if (config.ignoreList.indexOf(from) >= 0){ return false }
		var man
	message.split(" ").forEach(function(element){
		word = element.replace(/[^a-zA-Z]+/g, '')
		
		/*if (message.indexOf('spook')>-1
		   ){man=message;}
*/	
		if (message.indexOf(1)=='spook'
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

