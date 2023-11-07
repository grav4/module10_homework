const API = "wss://echo-ws-service.herokuapp.com";

const btnSend = document.querySelector('.client');
const btnGeo = document.querySelector('.location');
const input = document.querySelector('.input');
const chatText = document.querySelector('.chat-messages');
const textError = document.querySelector('.error');

const webSocket = new WebSocket(API);


webSocket.onopen = function(evt){
    console.log("Connected");
};
webSocket.onmessage = function(evt){
    writeToScreen(`Ответ сервера: ${evt.data}`, 'flex-start');
};
webSocket.onerror = function(evt){
    writeToScreen(`server ${evt.data}`, 'flex-start');
};

btnSend.addEventListener('click', () =>{
    let massege = input.value;

    if(massege == "") {
        textError.innerHtml = "Unable to send";
    }
    else{
        webSocket.send(massege);
        writeToScreen( `You: ${massege}`);
        input.value = "";
    }
});


function writeToScreen(massege, position = 'flex-end'){
    let chatEl = `<p class = "chat-messages" style = "align-self: ${position}" ${massege}></p>`;
    chatText.innerHTML += chatEl;
    //    !!!!!!
};


const error = () =>{
    textError.innerHTML = "Allow access to your geolocation";
};

const success = (position) =>{
    let latitude = position.coords.latitude;
    let langitude = position.coords.langitude;
    let link = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    writeToScreen(`<a href = '${link}' target = '_blanc'>Your geolocation</a>`);
};


btnGeo.addEventListener('click', () =>{
    if(!navigator.geolocation){
        textError.innerHTML = "This function is not supported by your browser";
    }
    else{
        navigator.geolocation.getCurrentPosition(success,error);
    }
});



