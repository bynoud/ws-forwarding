
// import io from 'socket.io-client';
// import './socket.io.js';

class WebSocketWrapper extends window.WebSocket {
    constructor(url, protocols = []) {
        super(url, protocols);
        console.log("wrapper construct", url, protocols);

        this.socket = io.connect('http://localhost:5000/ziga');

        this.addEventListener('message', function (event) {

            const data = new Uint8Array(event.data);
            console.log('Message from server ', data);
            // let s = [];
            // for (let i=0; i<byteArr.length; i++) s.push(byteArr[i].toString(16));
            // this.socket.emit('ziga-ws', s.join(' '));
            if (data[0] === 0 && data[1] === 13 && data[2] === 28) { // 000d 1c..
                console.log(" --> send move", {cmd:'move', 
                fx:data[7], fy:data[8],
                tx:data[9], ty:data[10]});
                this.socket.emit('ziga-ws', {cmd:'move', 
                                             fx:data[7], fy:data[8],
                                             tx:data[9], ty:data[10]})
            } else if (data[0] === 0 && data[1] === 18) {
                console.log('send newgame');
                this.socket.emit('ziga-ws', {cmd:'newgame'});
            } else if (data[0] === 0 && data[1] === 125) { // start ò viewing game
                console.log('send newgame viewmode');
                this.socket.emit('ziga-ws', {cmd:'newgame'});
            }
        });
        
        this.addEventListener('open', (event) => {
            console.log("opened", event);
        });

    }

    // onopen(event) {
    //     console.log("onopen", event);
    //     return super.onopen(event)
    // }

    // onmessage(event) {
    //     console.log("onmessage", event);
    //     return super.onmessage(event)
    // }
}

window.WebSocket = WebSocketWrapper;
console.log("injected", window.WebSocket);

