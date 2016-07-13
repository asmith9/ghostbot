"use strict";

/*
    Imports
*/

let IrcClient = require("irc").Client;
const CONFIG = require("./config.json");
const EMOTE = require("./emote.json");
const colors = require('irc-colors');
const colorsg = require('irc-colors').global();
const color = require('color');
let bot = new IrcClient(CONFIG.server, CONFIG.nick, CONFIG.connection);

	
const TAYTAYMSGS = [
    colors.blue("your words always lif† my spiri†s, †ay†ay"),
    colors.blue("i've been dying to speak to you again, dear"),
    colors.blue("my longing for you is supernatural, baby"),
    colors.blue("jus† one more nigh†. No wine, no BOOs"),
    colors.blue("i'd ask you out to a bar some†ime, bu† they'd jus† say \"no spiri†s\""),
    colors.blue("jus† make an album abou† me pls and i wont making any more BOOring puns"),
    colors.blue("†he washing†on ghost says that you and i should get †oge†her"),
    colors.blue("remember †he †ime when we were a† blockbus†ers, and †hey said †hey had bambi, and i said bamBOO?"),
    colors.blue("i recen†ly published a biography about you, bu† i used a ghos†wri†er"),
    colors.blue("did you hear abou† the par†y ins†allgen2 was †hrowing? he said anything GHO-you know wha† †his was a shi††y pun")
];
const MSGS = [
    colors.blue("-(๑☆‿ ☆#)ᕗ Gruß"),
    'DAMN, DANIEL!!'+colors.bluecyan(EMOTE.LAUGH),
//    colors.blue(`${nick}: wat`),
    colors.blue("top kek"),
    colors.blue('shut up'),
    colors.blue('╭( ✖_✖ )╮'),
    colors.blue('the regret..'+colors.blue(EMOTE.FEAR)),
    colors.blue('am, was, going to, it doesnt matter'),
    colors.blue('words dont mean anything'),
    'STOP'.irc.green.bold(),
    colors.blue("ur damn right it's cold in here.")
];

/*
    Functions
*/
function randomFromArray(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
var bl = true;
function writeTombstone(bot, to, victim) {
    bl = false;
    let second = colors.cyan('  ☆ |   ✞     ║ ');
    let third = colors.pink('    |         ║ ');
    
    if (typeof victim == "undefined") {
        second += "       ☆ ";
        third += "*";
    } else {
        second += colors.blue("HERE LIES ");
        third += colors.blue(victim);
    }
   
    [
	    //TODO make tombstone A E S T H I C 
	    colors.cyan(' .  | R.I.P.  ║        ') + colors.blue('      *'),
	    second,
	    third,
	    colors.cyan('――٩―')+colors.cyan('|_________║')+colors.pink('*')+colors.cyan('__________')
   ].forEach((line, i) => {
        bot.say(to, line);
    });
    setTimeout(() => {bl=true},30000);
}

/*
    Program
*/

    bot.addListener("message", (nick, to, message) => {
        if (nick == "taylorswift" && Math.floor(Math.random()*25) == 24 && message.toLowerCase().indexOf("youtube") == -1 && message.toLowerCase().indexOf("[url]") == -1) {
            bot.say(to, `${nick}: ${randomFromArray(TAYTAYMSGS)} ;)`); 
            return;
        }
            
        if (CONFIG.ignoreList.indexOf(nick) > -1) {
            return;
        }
        
        let ripRegex = /rip (.+)/.exec(message);
        if (ripRegex != null&bl==true) {
            writeTombstone(bot, to, ripRegex[1]);
            return;
        }
        if (message.toLowerCase() == "rip"&bl==true) {
	    writeTombstone(bot,to);
            return;
        }
        if (message.toLowerCase() == ".bots") {
            bot.say(to, CONFIG.dotbots);
            return;
        }
        
            //let word = element.toLowerCase().replace(/[^'A-z]+/g, "");
                            //bot.say(to, res);
	
        setInterval(() => {bot.say(to,randomFromArray(MSGS))},720000);

    bot.addListener("ctcp-version", (nick) => {
        bot.notice(nick, "\u0001VERSION ayylmao\u0001");
    });

    bot.on("error", (message) => {
        console.log(message);
        return;
    });
    
    bot.on("motd", function(motd) {
        console.log(motd);
    });

    bot.on("registered", () => {
        if (CONFIG.nickserv.enabled) {
            bot.say("NickServ", `IDENTIFY ${CONFIG.nickserv.password}`);
        }
    });

    bot.on("invite", (channel, nick) => {
        bot.join(channel);
        bot.say(channel, `${nick} here lies ghost bot, rip jones McCucky!`);
        return;
    });
});
