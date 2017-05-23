import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { WebsocketService } from './websocket.service';
import { Connection } from '../interfaces/connection';
import { AircraftResponse } from '../interfaces/aircraftResponse';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';

@Injectable()
export class AircraftService {

  // Stores the last acceptable response in order to check if the current makes sense.
  private lastGoodResponse: AircraftResponse;

  // Max acceptable difference between last state and current state.
  private ALTITUDE_RANGE = 30;
  private AIRSPEED_RANGE = 15;

  constructor(private connection: WebsocketService) {
  }

  getData(): Observable<AircraftResponse> {
    return this.connection.getStream()

      // Observable.map() transforms the raw websocket response into something usable.
      .map(res => this.toJsonOrNull(res))

      // Having either a well formed JSON, or a null value, I filter it to ensure
      // only "100% true data" gets out of the service.
      .filter(res => res && this.checkData(res))

      // The observale is only going to emit the values that pass the filter, so
      // everything from here on should be safe and trustable.
      .do(res => this.lastGoodResponse = res);
  }

  getConnectionStatus(): Observable<string> {
    return this.connection.getConnectionStatus();
  }

  toggleLandingGear(state: boolean): void {
    const msg = {
      type: 'landing_gear',
      value: +state
    };
    this.connection.sendMessage(JSON.stringify(msg));
  }

  switchFlaps(position: number) {
    const msg = {
      type: 'flaps',
      value: Math.max(0, Math.min(5, +position))
    };
    this.connection.sendMessage(JSON.stringify(msg));
  }

  // Invalid JSON gets transformed into null, so I can filter it in the next step.
  private toJsonOrNull(data: string): AircraftResponse {
    try {
      return JSON.parse(data);
    } catch (err) {
      return null;
    }
  }

  // Even if the JSON is well formed, it can have crazy values.
  private checkData(data: AircraftResponse): boolean {
    if (this.lastGoodResponse) {
      const airspeedDelta = Math.abs(data.telemetry.airspeed - this.lastGoodResponse.telemetry.airspeed);
      const altitudeDelta = Math.abs(data.telemetry.altitude - this.lastGoodResponse.telemetry.altitude);

      return airspeedDelta <= this.AIRSPEED_RANGE && altitudeDelta <= this.ALTITUDE_RANGE;
    }

    // If I don't have anything to compare with, I just check if at least it has positive values.
    return data.telemetry.airspeed > 0 && data.telemetry.altitude > 0;
  }

}
