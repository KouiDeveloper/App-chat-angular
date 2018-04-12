import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class SocketService {

    private socket: WebSocket;
    private listener: EventEmitter<any> = new EventEmitter();

    public constructor() {
        this.socket = new WebSocket("wss://echo.websocket.org");
        this.socket.onopen = event => {
            this.listener.emit({"type": "open", "data": event});
        }
        this.socket.onclose = event => {
            this.listener.emit({"type": "close", "data": event});
        }
        this.socket.onmessage = event => {
            console.log(event)
            //this.listener.emit({"type": "message", "data": JSON.parse(event.data)});
            this.listener.emit({"type": "message", "data": event.data});
        }
    }

    // public send(data: string) {
    //     d :Array
    //     this.socket.send();
    // }
    public send(data: string) {
        this.socket.send(data);
    }

    public close() {
        this.socket.close();
    }

    public getEventListener() {
        return this.listener;
    }

}