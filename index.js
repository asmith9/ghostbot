"use strict";

/*
    Imports
*/

let IrcClient = require("irc").Client;
const CONFIG = require("./config.json");
const EMOTE = require("./emote.json");
const colors = require('irc-colors');

	
const TAYTAYMSGS = [
    "your words always lift my spirits, taytay",
    "i've been dying to speak to you again, dear",
    "my longing for you is supernatural, baby",
    "just one more night. No wine, no BOOs",
    "i'd ask you out to a bar sometime, but they'd just say \"no spirits\"",
    "just make an album about me pls and i wont making any more BOOring puns",
    "the washington ghost says that you and i should get together",
    "remember the time when we were at blockbusters, and they said they had bambi, and i said bamBOO?",
    "i recently published a biography about you, but i used a ghostwriter",
    "did you hear about the party installgen2 was throwing? he said anything GHO-you know what this was a shitty pun"
];

/*
    Functions
*/

function randomFromArray(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function writeTombstone(bot, to, victim) {
    let second = colors.grey('  ☆ | R.I.P.  || ');
    let third = colors.grey('    |   †     || ');
    
    if (typeof victim == "undefined") {
        second += "       ☆ ";
        third += "*";
    } else {
        second += "HERE LIES ";
        third += victim;
    }
/*
                  _\<
                 (   >
                 __)(
            _____/  //   ___
          /        \\  /  \\__
          |  _     //  \     ||
          | | \    \\  / _   ||
          | |  |    \\/ | \  ||
          | |_/     |/  |  | ||
          | | \     /|  |_/  ||
          | |  \    \|  |     >_ )
          | |   \. _|\  |    < _|=
          |          /_.| .  \/
  *       | *   **  / * **  |\)/)    **
   \))ejm97/.,(//,,..,,\||(,wo,\ ).((//

*/
    
    [
colors.blue('                  _\<        ☆'),
colors.blue('                 (   \>'),
colors.blue('    ☆            __)('),
colors.blue('           _____/  //   ___'),
colors.blue('          /        \\\\  /  \\__      ☆'),
colors.blue('          |  _     //  \     ||'),
colors.blue('          | | \    \\\\  / _   ||'),
//taylor slays her lover right around here.
colors.blue('          | |  |    \\\\/ | \\  ||'),
colors.blue('          | |_/     |/  |  | ||'),
colors.blue(' ☆        | | \\     /|  |_/  ||'),
colors.blue('          | |  \\    \\|  |     >_ \\)'),
colors.blue('   ☆      | |   \\. _|\\  |    < _|\\='),
colors.blue('          |          /_.| .  \/'),

    ].forEach((line, i) => {
        bot.say(to, line);
    });
}

/*
    Program
*/

{
    let bot = new IrcClient(CONFIG.server, CONFIG.nick, CONFIG.connection);

    bot.addListener("message", (nick, to, message) => {
        if (nick == "taylorswift" && Math.floor(Math.random()*25) == 24 && message.toLowerCase().indexOf("youtube") == -1 && message.toLowerCase().indexOf("[url]") == -1) {// 1/25 chance of replying to taylorswift. TODO: get taylorswift to always respond with "die"
            bot.say(to, `${nick}: ${randomFromArray(TAYTAYMSGS)} ;)`); 
            return;
        }
            
        if (CONFIG.ignoreList.indexOf(nick) > -1) {
            return;
        }
        
        let ripRegex = /rip (.+)/.exec(message);
        if (ripRegex != null) {
            writeTombstone(bot, to, ripRegex[1]);
            return;
        }
        
        if (message.toLowerCase() == "rip") {
            writeTombstone(bot, to);
            return;
        }
        
        if (message.toLowerCase() == ".bots") {
            bot.say(to, CONFIG.dotbots);
            return;
        }
        
        let res = "";
        message.split(" ").forEach((element) => {
            let word = element.toLowerCase().replace(/[^_-z]+/g, ""); // this limits words to being a-z, while still including '_' and '`'
            
            switch (word) {
		case "sieg":
		    res = "-(๑☆‿ ☆#)ᕗ";
		    break;
                case "jesus":
                    res = `${nick}: jeebus *`;
		    break;
		case "boo":
		    res = "top kek";
		    break;
                case "ghost":
                    res = '╭( ✖_✖ )╮';
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
