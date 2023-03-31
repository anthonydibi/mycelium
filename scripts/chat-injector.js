//wrapped in a closure to prevent global variables from interfering
(function(){
//make sure that the script has not run before
if(window.MYCLM_HASRUN_FMQJR === true){ //strict equality, bc there could be a DOM element ID on the window with "true"
    return true;
}
window.MYCLM_HASRUN_FMQJR = true;

const addOwnMessage = (msg) => {
    let message = document.createElement('div');
    message.classList.add('msg');
    message.classList.add('msg-right');
    message.innerText = msg;
    let frame = document.querySelector("#mycelium-iframe");
    console.log(frame);
    console.log(frame.contentWindow.document.body);
    chatMessages.appendChild(message);
}

const addMessage = (msg) => {
    let message = document.createElement('div');
    message.classList.add('msg');
    message.classList.add('msg-left');
    message.innerText = msg;
    let chatMessages = document.querySelector("#mycelium-messages");
    chatMessages.appendChild(message);
}

//injectee page might have its own CSS/JS that clashes with injected html, so wrap in an iframe
let iframe = document.createElement('iframe');
iframe.src = chrome.runtime.getURL('content/chat.html');
iframe.title = "Mycelium chat window";
iframe.id = "mycelium-iframe";
iframe.style.cssText = 'position:fixed;bottom:0;right:0;display:block;' +
                        'z-index:1000; border: 1px solid black !important;' + 
                        'width: 400px !important; height: 300px !important; background-color: beige;';
document.body.appendChild(iframe);

//listen for messages from iframe and forward them to background script
window.addEventListener(
    "message",
    (message) => {
        browser.runtime.sendMessage(JSON.parse(JSON.stringify(message))); //TODO: have to stringify then parse back to json, or else methods can't be cloned
    },
    false
);

//listen for messages from background script and forward them to iframe
chrome.runtime.onMessage.addListener(
    function(message) {
      iframe.contentWindow.postMessage(JSON.parse(JSON.stringify(message)), '*');
    }
  );
})();