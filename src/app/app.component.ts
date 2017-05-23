import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { WebsocketService } from './services/websocket.service';
import { AircraftService } from './services/aircraft.service';
import { AircraftResponse } from './interfaces/aircraftResponse';

@Component({
  selector: 'abd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [WebsocketService, AircraftService]
})
export class AppComponent implements OnInit {

  aircraftStream$: Observable<AircraftResponse>;
  connectionStatus$: Observable<string>;

  constructor(private aircraft: AircraftService, private connection: WebsocketService) { }

  ngOnInit() {
    this.connection.connect('ws://localhost:8888/telemetry');
    this.connectionStatus$ = this.aircraft.getConnectionStatus();


    // Automatically reconnected websockets will still emit to this
    // very same subject, however, If I go offline, the reconnected
    // ws will emit on a different one, and I should resubscribe again.

    this.aircraftStream$ = this.aircraft.getData();
  }

  toogleLandingGear(state: boolean) {
    this.aircraft.toggleLandingGear(state);
  }

  switchFlaps(pos: number) {
    this.aircraft.switchFlaps(pos);
  }
}
