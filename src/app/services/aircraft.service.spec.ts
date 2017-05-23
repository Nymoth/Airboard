/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { AircraftService } from './aircraft.service';
import { WebsocketService } from './websocket.service';
import { Connection } from '../interfaces/connection';
import 'rxjs/add/observable/from';

class WebsocketServiceMock implements Connection {

  private mockData = [
    'hello, world',
    '{"control": {"landing_gear": 0, "flaps": 2}, "telemetry": {"altitude": 18504, "airspeed": 207}}',
    '{"control": {"landing_gear": 0, "flaps": 2}, "telemetry": {"altitude": 273028, "airspeed": 210}}',
    'The quick jet plane jetwashed my lazy prop',
    '{"control": {"landing_gear": 0, "flaps": 2}, "telemetry": {"altitude": 18500, "airspeed": 210}}'
  ];

  private connectionStatusMock = ['offline', 'connecting', 'online'];

  connect(url: string) {}
  getStream(): Observable<any> {
    return Observable.from(this.mockData);
  };
  sendMessage(msg: string): Observable<any> {
    return Observable.of(msg);
  };
  getConnectionStatus(): Observable<string> {
    return Observable.from(this.connectionStatusMock);
  };
}

describe('AircraftService', () => {

  let service: AircraftService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AircraftService,
        { provide: WebsocketService, useClass: WebsocketServiceMock }
      ]
    });

  });

   beforeEach(inject([AircraftService], (aircraftService: AircraftService) => {
    service = aircraftService;
  }));

  it('should fetch and filter a stream of data', done => {
    const values = [];
    service.getData()
      .finally(() => {
        expect(values.length).toBe(2);
        done();
      })
      .subscribe(res =>  {
        values.push(res);
      });
  });

  it('should inform the connection status', done => {
    const values = [];
    service.getConnectionStatus()
      .finally(() => {
        expect(values[0]).toEqual('offline');
        expect(values[1]).toEqual('connecting');
        expect(values[2]).toEqual('online');
        done();
      })
      .subscribe(res =>  {
        values.push(res);
      });
  });
});
