let prompt = document.querySelector("#prompt");
let btn = document.querySelector("#btn");
let userMsg = null;
let chatContainer = document.querySelector(".chat-container");
let apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBXtqKOh3nOrjBE_lBsbkVTBbRkQY7-TTs";
// let container = querySelector(".container");


async function getApiResponse(aiChatBox) {

    let textElement = aiChatBox.querySelector(".text");
    
    try {
        
        let response = await fetch(apiUrl, {
            method : "POST",
            headers : {"Content-Type": "application/json" },
            body:JSON.stringify({
                contents: [
                    {"role": "user",
                        "parts": [{text : userMsg}]}]
            })
    
        })
        
       let  data = await response.json();
    //    console.log(data);
    let apiResponse = data?.candidates[0].content.parts[0].text;
    // console.log(apiResponse);
    textElement.innerText = apiResponse;       

    } catch (error) {
        console.log(error);
        
    }

    finally {
        aiChatBox.querySelector(".loading").style.display = "none";
    }
}


function createChatBox(html, className) {
    let div = document.createElement('div');
    div.classList.add(className);
    div.innerHTML = html;
    return div;
}

function showLoading() {
    let html = `<div class="img">
                <img src="./bot.png" width="30px" alt="">
            </div>
            <p class="text">
            </p>
            <img src="./gif.gif" alt="loading" width="50" class="loading">`;

    let aiChatBox = createChatBox(html,"bot-chat");
    chatContainer.appendChild(aiChatBox);
    getApiResponse(aiChatBox)

    
    
}

btn.addEventListener("click", () => {

  userMsg = prompt.value;
  // console.log(userMsg);

  if (!userMsg) return;

  let html = `<div class="img">
                <img src="./user.png" width="30px" alt="">
            </div>
            <p class="text">
            </p>`;

    let userChatBox = createChatBox(html,"user-chat");
    userChatBox.querySelector(".text").innerText = userMsg;
    chatContainer.appendChild(userChatBox);
    prompt.value = "";
    setTimeout(showLoading, 500)
});
