const { Client, GatewayIntentBits } = require('discord.js');
const http = require("http")

var CLIENT_ARR = []

function NewClient(token, res) {
    try {
        console.log("initialized newclient function with " + token)
        const client = new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent
            ]
        });
        client.on("ready", function(client) {
            console.log("ready, " + client.user.username)
            res.end("ready")
            CLIENT_ARR[token] = client
        })
        client.login(token).catch(function(login_err) {
            console.log("error after trying to log in: " + login_err)
            res.end("error")
            console.log("ended response")
        })
    } catch (err) {
        console.log("error: " + err)
    	res.end("error")
    }
}

function FindClientInArray(token) {
  for (let index = 0; index < CLIENT_ARR.length; index++) {
    const element = CLIENT_ARR[index];
    console.log("iterating over " + index + ", token is " + token)
    console.log("index is the same as token?: " + (token == index).toString())
    if (index == token) {
      console.log("found client in function")
      return element;
    }
  }
  return false;
}

function SendMessageInGuild(guild_id, msg, res, client, channel_name) {
    const guild = client.guilds.cache.get(guild_id);
    
    if (!guild) {
        res.end('err:no_guild');
    }
    const channel = guild.channels.cache.find(c => c.name === channel_name && c.isTextBased());
    
    if (!channel) {
        res.end('err:no_channel');
    }
    channel.send(msg)
        .then(() => {
            res.end('sent');
        })
        .catch(err => {
            console.error('Error sending message:', err);
            res.end('err:' + err);
        });
}



http.createServer(function(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    console.log("received request, request URL is " + req.url)
    var SPLIT = req.url.split("/")
    var TOKEN = SPLIT[1]
    var MESSAGE = TOKEN.split("?")
    console.log("message 0 is " + MESSAGE[0] + " and message 1 is " + MESSAGE[1])
    if (MESSAGE[1] == "message") {
    	NewClient(TOKEN, res)
        if (req.method == "POST") {
            let BODY = ""
            var CLIENT = FindClientInArray(TOKEN)
            if (CLIENT) {
                req.on("data", function(CHUNK) {
                    BODY += CHUNK
                })
                req.on("end", function() {
                    var PARSED = JSON.parse(BODY)
                    var GUILD = PARSED.GUILD
                    var MSG = PARSED.MESSAGE
                    var CHANNEL = PARSED.CHANNEL
                    console.log(PARSED)
                    SendMessageInGuild(GUILD, MSG, res, CLIENT, CHANNEL)
                })
            } else {
                res.end("error")
            }
        } else {
            res.end("error")
        }
    } else {
        console.log("received with " + TOKEN)
        NewClient(TOKEN, res)
    }
}).listen(6020, function() {
    console.log("listening on 6020")
})
