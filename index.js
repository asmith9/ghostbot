var irc = require("irc");
var math = require("math");

var config = {
    server: "irc.rizon.net",
    channels: ["#pasta"],
    ignoreList: ["CummyPawsBot", "Combot", "PastaBot", "cuckbot", "kekbot", "pepebot", "katbot"],
    nick: "ghost_bot",
    userName: "username",
    realName: "man",
    nickservEnabled: true,
    nickservPass: "userpass"
}
var bot = new irc.Client(config.server, config.nick, config)
var tombstone = [" |________|",
    " |  RIP   |",
    "  /￣￣￣\\"
]

var faces = ["(ц｀ω´ц*)", "“ψ(｀∇´)ψ", "ψ(*｀ー´)ψ", "Ψ(｀▽´)Ψ",
    "Ψ(｀◇´)Ψ", "(屮｀∀´)屮", "Щ(･｀ω´･Щ)", "Ψ(￣∀￣)Ψ",
    "Ψ(☆ｗ☆)Ψ", "Ψ( ●｀▽´● )Ψ", "ψ（｀Д´）ψ", "ლ(｀∀´ლ)",
    "＜(●｀∀´●)＞”", "o(○｀ω´○)9", "ρ(｀.´)ρ", "पुनः कदा मेलिष्यामः ?"
]

bot.addListener("message", function(from, to, message) {
    if (config.ignoreList.indexOf(from) >= 0) {
        return false
    }
    var man
    var c
    message.split(" ").forEach(function(element) {
        word = element.replace(/[^a-zA-Z]+/g, '')
        if (word.toLowerCase() == "rip") {
            function loop(n) {
                var tombstone = ["――٩―|________|✿｡――――/―ノ―――ヾ―――", "    | ~----~ |",
                    "  ☆ | R.I.P. |    *    ☆ ",
                    "     /￣￣￣\\ ☆      *"
                ]
                if (n >= 0) {
                    setTimeout(function() {
                        bot.say(to, tombstone[n]);
                        loop(n - 1);
                    }, 1);
                }
            }
            loop(5);
        } else if (word.toLowerCase() == "spooky" ||
            word.toLowerCase() == "scary" ||
            word.toLowerCase() == "skeletons") {
            var randomnumber = math.floor(Math.random() * 16)
            bot.say(to, faces[randomnumber]);
        }
    });
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
