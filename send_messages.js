var MSG_BOX = document.getElementById("message")
var GUILDID_BOX = document.getElementById("guildid")
var CHANNELNAME_BOX = document.getElementById("channel")
var BUTTON = document.getElementById("send")
var HIDDEN = document.getElementById("blank")
var RESPONSE_TEXTBOX = document.getElementById("res")
var DEF_URL = "http://194.164.125.5:6020"

import { GET_GLOBAL } from "./globals"

function OnClick() {
    console.log("clicked")
    var TOKEN = GET_GLOBAL("token")
    var MSG = MSG_BOX.value
    var GUILDID = GUILDID_BOX.value
    var CHANNELNAME = CHANNELNAME_BOX.value
    if (MSG.trim() != "" && GUILDID.trim() != "" && CHANNELNAME.trim() != "") {
        console.log("texts were OK (not blank)")
        HIDDEN.setAttribute("hidden", "")
        var DATA = {
            "GUILD": GUILDID,
            "MESSAGE": MSG,
            "CHANNEL": CHANNELNAME
        }
        var URL = DEF_URL + "/" + TOKEN + "?" + "message"
        fetch(URL, {
            "body": JSON.stringify(DATA)
        }).then(async function(res) {
            var RESPONSE = await res.text() 
            console.log("response is " + RESPONSE)
            RESPONSE_TEXTBOX.innerHTML = "Response: " + RESPONSE
        }).catch(function(error) {
            console.log("catched error on sending message: " + error)
        })
    } else {
        console.log("texts were blank")
        HIDDEN.removeAttribute("hidden")
    }
}

BUTTON.addEventListener("click", OnClick)
