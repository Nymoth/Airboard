/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { WebsocketService } from './websocket.service';
import { $WebSocket } from 'angular2-websocket/angular2-websocket';
import { Server } from 'mock-socket';
import 'rxjs/add/operator/take';

describe('WebsocketService', () => {

  let service: WebsocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebsocketService]
    });
  });

  beforeEach(inject([WebsocketService], (websocketService: WebsocketService) => {
    service = websocketService;
  }));

  it('should connect to a websocket given an uri', done => {
    const mockServer = new Server('ws://localhost:8080');
    service.connect('ws://localhost:8080');
    mockServer.on('connection', () => {
      expect(true).toBeTruthy();
      mockServer.stop(done);
    });
  });

  it('should get a stream of data', done => {
    const mockServer = new Server('ws://localhost:8080');
    service.connect('ws://localhost:8080');
    const stream$ = service.getStream();
    mockServer.on('connection', () => {
      mockServer.send('test');
      mockServer.stop(done);
    });
    stream$.subscribe(msg => {
      expect(msg).toEqual('test');
      done();
    });
  });

  // Either mock-socket does not support receiving messages
  // or I'm doing something wrong...

  // it('should be able to send messages', done => {
  //   const mockServer = new Server('ws://localhost:8080');
  //   service.connect('ws://localhost:8080');

  //   mockServer.on('message', (msg) => {
  //     console.log(msg);
  //     expect(msg).toEqual('test');
  //     mockServer.stop(done);
  //   });

  //   service.sendMessage('test');

  // });

  it('should be able to inform its connection status', done => {
    const responses = [];
    const mockServer = new Server('ws://localhost:8080');
    service.getConnectionStatus()
      .take(3)
      .finally(() => {
        expect(responses[0]).toEqual('offline');
        expect(responses[1]).toEqual('connecting');
        expect(responses[2]).toEqual('online');
        done();
      })
      .subscribe(status => responses.push(status));
    service.connect('ws://localhost:8080');
    mockServer.on('connection', () => {
      mockServer.stop(done);
    });
  });


});
