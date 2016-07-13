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


	
const TAYTAYMSGS = [
    "your words always lif† my spiri†s, †ay†ay",
    "i've been dying to speak to you again, dear",
    "my longing for you is supernatural, baby",
    "jus† one more nigh†. No wine, no BOOs",
    "i'd ask you out to a bar some†ime, bu† they'd jus† say \"no spiri†s\"",
    "jus† make an album abou† me pls and i wont making any more BOOring puns",
    "†he washing†on ghost says that you and i should get †oge†her",
    "remember †he †ime when we were a† blockbus†ers, and †hey said †hey had bambi, and i said bamBOO?",
    "i recen†ly published a biography about you, bu† i used a ghos†wri†er",
    "did you hear abou† the par†y ins†allgen2 was †hrowing? he said anything GHO-you know wha† †his was a shi††y pun"
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
    let second = colors.cyan('  ☆ |         ║ ');
    let third = colors.pink('    |   ✞     ║ ');
    
    if (typeof victim == "undefined") {
        second += "       ☆ ";
        third += "*";
    } else {
        second += "HERE LIES ";
        third += victim;
    }
   
    [
	    //TODO make tombstone A E S T H I C 
	    colors.red(' .  | R.I.P.  ║        ') + colors.blue('      *') + '       ' + colors.blue('*'),
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

{
    let bot = new IrcClient(CONFIG.server, CONFIG.nick, CONFIG.connection);

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
        
        let res = "";
        message.split(" ").forEach((element) => {
            //let word = element.toLowerCase().replace(/['^_-z]+/g, "");
            let word = element;
            
            switch (word) {
		case "hiya":
		    res = colors.blue("-(๑☆‿ ☆#)ᕗ Gruß");
		    break;
		case "damn":
		    res = colors.blue('DANIEL!!'+colors.bluecyan(EMOTE.LAUGH));
		    break;
                case "ghost_bot":
                    res = colors.blue(`${nick}: wat`);
		    break;
		case "boo":
		    res = colors.blue("top kek");
		    break;
		case "kys":
		    res = colors.blue('shut up');
		    break;
                case "ghost":
                    res = colors.blue('╭( ✖_✖ )╮');
		    break;
		case "was":
		    res = colors.blue('the regret..'+colors.blue(EMOTE.FEAR));
                    break;
		case "am":
		    res = colors.blue('am, was, going to, it doesnt matter');
	            break;
		case "going":
		    res = colors.blue('words dont mean anything');
		    break;
	        case "1992":
		    res =  'STOP'.irc.green.bold();
		    break;
		case "cold":
		    res = colors.blue("ur damn right it's cold in here.");
		    break;
		case "song":
		    res = colors.blue("Check out my soundcloud https://soundcloud.com/asmith0/winter-cherry");
		    break;

            }
        });
        if (res != "")
                bot.say(to, res);
    });

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
}
