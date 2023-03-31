var socket = io('http://localhost:3000');

let currUrl = null;

/**
 * browser action listeners
 */

const filter = {
    properties: ["url"]
}

function handleTabUpdated(tabId, changeInfo, tabInfo) {
    if (changeInfo.url) {
        //socket.emit("webNavigation", changeInfo.url, currUrl);
        console.log("injecting");
        currUrl = changeInfo.url;
        const chatInjection = browser.tabs.executeScript({
            file: "scripts/chat-injector.js",
            allFrames: false
        });
        chatInjection
            .then(() => { browser.tabs.sendMessage(tabId, {type: "test", message: "testy"}) });
    }
}

browser.tabs.onUpdated.addListener(handleTabUpdated, filter);
/**
 * tab <-> background script messaging
 */
browser.runtime.onMessage.addListener((message) => {
      console.log("received");
    }
  );