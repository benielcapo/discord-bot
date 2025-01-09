var DEF_URL = "http://194.164.125.5:6020"
var button = document.getElementById("OK")
var textbox = document.getElementById("token")
var ERR_TEXT = document.getElementById("err_text")

import { SET_GLOBAL } from "./globals"

button.addEventListener("click", async function() {
    console.log("clicked");
    var text = textbox.value
    console.log(text)
    var URL = DEF_URL + "/" + text
    console.log("final URL: " + URL)
    fetch(URL).then(async function(response) {
      console.log("got response: " + response)
      return response
    }).then(async function(res) {
      var TEXT = await res.text()
      console.log("parsed response is: " + TEXT)
      if (TEXT == "ready") {
        SET_GLOBAL("token", text)
        window.location.href = "success.html"
      } else {
        console.log("removing attribute of hidden and initializing for loop")
        ERR_TEXT.removeAttribute("hidden")
        let WAIT_INDEX = 0;
        for (let index = 5; index >= 0; index = index - 1) {
          WAIT_INDEX++
          setTimeout(() => {
            console.log("iteration " + index)
            ERR_TEXT.innerHTML = "if you are seeing this, your request was unsuccessfull, reloading page in: " + index.toString()
            if (index == 0) {
              location.reload()
            }
          }, WAIT_INDEX * 1000);
        }
      }
    })
    .catch(function(reason) {
      console.log("catched error: " + reason)
    })
})
