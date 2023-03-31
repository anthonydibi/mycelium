const addOwnMessage = (msg) => {
    let message = document.createElement('div');
    let messageContainer = document.createElement('div');
    messageContainer.classList.add('msg-container');
    message.classList.add('msg');
    message.classList.add('msg-right');
    message.innerText = msg;
    messageContainer.appendChild(message);
    let chatMessages = document.querySelector("#mycelium-messages");
    chatMessages.appendChild(messageContainer);
}

const addMessage = (msg) => {
    let message = document.createElement('div');
    let messageContainer = document.createElement('div');
    messageContainer.classList.add('msg-container');
    message.classList.add('msg');
    message.classList.add('msg-left');
    message.innerText = msg;
    messageContainer.appendChild(message);
    let chatMessages = document.querySelector("#mycelium-messages");
    chatMessages.appendChild(messageContainer);
}

window.addEventListener(
    "message",
    (message) => {
        addMessage("Hi! This is a test. Mycelium is a cool extension where you can chat with people!!");
        addOwnMessage("hi");
        addOwnMessage("I love uuuuu<3");
        addMessage("No way!!! Really??????")
        addOwnMessage("ya!!!");
        addOwnMessage("of course!!");
    },
    false
);



