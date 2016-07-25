"use strict";

/*
    Imports
*/

let IrcClient = require("irc").Client;
const CONFIG = require("./config.json");
const EMOTE = require("./emote.json");
const colors = require('irc-colors');
const colorsg = require('irc-colors').global();
let bot = new IrcClient(CONFIG.server, CONFIG.nick, CONFIG.connection);

	
const TAYTAYMSGS = [
    colors.violet("your words always lif† my spiri†s, †ay†ay"),
    colors.violet("i've been dying to speak to you again, dear"),
    colors.violet("my longing for you is supernatural, baby"),
    colors.violet("jus† one more nigh†. No wine, no BOOs"),
    colors.violet("i'd ask you out to a bar some†ime, bu† they'd jus† say \"no spiri†s\""),
    colors.violet("jus† make an album abou† me pls and i wont making any more BOOring puns"),
    colors.violet("†he washing†on ghost says that you and i should get †oge†her"),
    colors.violet("remember †he †ime when we were a† blockbus†ers, and †hey said †hey had bambi, and i said bamBOO?"),
    colors.violet("i recen†ly published a biography about you, bu† i used a ghos†wri†er"),
    colors.violet("did you hear abou† the par†y ins†allgen2 was †hrowing? he said anything GHO-you know wha† †his was a shi††y pun")
];
const MSGS = [
    //colors.violet("-(๑☆‿ ☆#)ᕗ Gruß"),
    colors.violet('DAMN, DANIEL!!')+colors.cyan(EMOTE.LAUGH),
    //colors.violet(`${nick}: wat`),
    colors.violet("top kek"),
    colors.violet('shut up'),
    //colors.violet('╭( ✖_✖ )╮'),
    colors.violet('the regret..'+colors.violet(EMOTE.FEAR)),
    colors.violet.bgred('ah, the sweet release of death.'),
    //colors.violet('words dont mean anything'),
    //'STOP'.irc.green.bold(),
    //colors.violet("ur damn right it's cold in here."),
    colors.cyan("IT'S A LONG WAY DOWN"),
    //colors.cyan.bgblack("https://soundcloud.com/divine/holdon")
    colors.cyan.bgblack("https://www.youtube.com/watch?v=_Yr5rn3Sv_4")
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
    let second = colors.navy.bgblack(" ☆ ")+colors.black.bgwhite(" R.I.P. ║");
    let third =  colors.cyan.bgblack("      ")+colors.black.bgwhite("  ║");
    
    if (typeof victim == "undefined") {
        second += colors.navy.bgblack("       ☆ ");
        third += colors.cyan.bgblack("*          ");
    } else {
        second += colors.cyan.bgblack("  HERE LIES ");
        third += colors.cyan.bgblack("     "+victim+"       ");
    }
   
    [
	    //TODO make tombstone A E S T H I C 
	    colors.cyan.bgblack("      ")+colors.black.bgwhite("  ║") + colors.purple.bgblack("         ☆     "),
	    second,
	    third,
	    colors.cyan.bgteal("    ")+colors.cyan.bgteal("  ")+colors.black.bgwhite("  ║")+colors.cyan.bgteal("               "),
	    colors.cyan.bgteal("                        ")
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
        
        if(nick=="Lexoi" && message.toLowerCase() == ".bene") {
		setTimeout(()=>{bot.say(to,message)},8000);
		setTimeout(()=>{bot.say(to,".mug Lexoi")},8000);
	}
	
        setTimeout(() => {bl=true},30000);
        //setInterval(() => {bot.say(to,randomFromArray(MSGS))},16000);

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
