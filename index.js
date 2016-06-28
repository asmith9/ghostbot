"use strict"

/*
    Imports
*/

let IrcClient = require("irc").Client;

/*
    Constants
*/

const CONFIG = {
    server: "irc.rizon.net",
    channels: ["##pasta"],
    ignoreList: ["CummyPawsBot", "Combot", "PastaBot", "cuckbot", "kekbot", "pepebot", "katbot"],
    nick: "ghost_bot",
    userName: "username",
    realName: "man",
    nickservEnabled: true,
    nickservPass: "userpass",
};

const TOMBSTONE = [
    "     /￣￣￣\\\\ ☆      *",
    " ☆  | R.I.P. ||         ☆ ",
    "    | ~----~ ||  *",
    "――٩―|________||✿｡――――/―ノ―――ヾ―――", 
];

const FACES = [
    "(ц｀ω´ц*)",
    "“ψ(｀∇´)ψ",
    "ψ(*｀ー´)ψ",
    "Ψ(｀▽´)Ψ",
    "Ψ(｀◇´)Ψ",
    "(屮｀∀´)屮",
    "Щ(･｀ω´･Щ)",
    "Ψ(￣∀￣)Ψ",
    "Ψ(☆ｗ☆)Ψ",
    "Ψ( ●｀▽´● )Ψ",
    "ψ（｀Д´）ψ",
    "ლ(｀∀´ლ)",
    "＜(●｀∀´●)＞”",
    "o(○｀ω´○)9",
    "ρ(｀.´)ρ",
    "पुनः कदा मेलिष्यामः ?"
];

/*
    Functions
*/

function randomFromArray(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

/*
    Program
*/

{
    let bot = new IrcClient(CONFIG.server, CONFIG.nick, CONFIG);

    bot.addListener("message", (nick, to, message) => {
        if (CONFIG.ignoreList.indexOf(nick) >= 0) {
            return;
        }
        
        message.split(" ").forEach((element) => {
            let word = element.toLowerCase().replace(/[^_-z]+/g, "");
            
            switch (word) {
                case "rip":
                    TOMBSTONE.forEach((line, i) => {
                        setTimeout((line) => {
                            bot.say(to, line);
                        }, 1000 * i, line);
                    });
                    break;
                case "spooky":
                case "scary":
                case "skeletons":
                    bot.say(to, randomFromArray(FACES));
                    break;
                case "kys":
                case "kms":
		case "dead":
                    bot.say(to, "／(x~x)＼ अजीव");
                    break;
		case "holy":
		case "god":
		case "jesus":
		    bot.say(to, "ゞ◎Д◎ヾ धावनं करोति { कृ }");
		    break;
		case "ghost_bot":
		    bot.say(to, "(((╬  ╬) ईङ्खति ");
		    break;
            }
        });
    });

    bot.addListener("ctcp-version", (nick, to, message) => {
        bot.notice(nick, "\u0001VERSION ayylmao\u0001");
    });

    bot.on("error", (message) => {
        console.log(message);
        return;
    });

    bot.on("registered", () => {
        if (CONFIG.nickservEnabled) {
            bot.say("NickServ", `IDENTIFY ${CONFIG.nickservPass}`);
        }
    });

    bot.on("invite", (channel, nick) => {
        bot.join(channel);
        bot.say(channel, `${nick} here lies ghost bot, rip jones McCucky!`);
        return;
    });
}
