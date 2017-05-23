import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { $WebSocket, WebSocketConfig, WebSocketSendMode } from 'angular2-websocket/angular2-websocket';
import { Connection } from '../interfaces/connection';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/merge';
import 'rxjs/add/observable/of';

@Injectable()
export class WebsocketService implements Connection {

  private ws: $WebSocket;
  private status: string;
  private status$: EventEmitter<string>;
  private sendLock: boolean;

  constructor() {
    this.status$ = new EventEmitter<string>();
    this.status = 'offline';
    this.sendLock = true;
  }

  connect(url: string): void {
    this.changeStatus('connecting');

    const config: WebSocketConfig = {
      reconnectIfNotNormalClose: true,
      initialTimeout: 500,  // default value
      maxTimeout: 300000    // default value
    };

    this.ws = new $WebSocket(url, undefined, config);

    // This gets triggered whenever the connection gets closed, however,
    // it tries to reconnect automatically.
    this.ws.onClose(() => {
      this.changeStatus('connecting');
      this.sendLock = true;
    });
    this.ws.onOpen(() => {
      this.changeStatus('online');

      // Only allow 1 message to be on the queue, to ensure actions
      // remain atomic.
      this.sendLock = false;
    });
  }

  getStream(): Observable<any> {
    return this.ws.getDataStream()
      .map(res => res.data);
  }

  sendMessage(message: string): void {
    if (!this.sendLock) {
      this.ws.send(message, WebSocketSendMode.Direct);

      // The message is sent in a newly created websocket, which gets created
      // automatically as the result of the following manual close.
      this.ws.close();
    }
  }

  getConnectionStatus(): Observable<string> {
    return Observable

      // If I subscribe to this after the current status has been emitted
      // I will lose it, so this just emits it at the beginning.
      .of(this.status)
      .merge(this.status$);
  }

  private changeStatus(status: string): void {
    this.status$.emit(status);
    this.status = status;
  }

}
