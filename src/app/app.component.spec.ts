/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';

import { ConnectionIndicatorComponent } from './components/connection-indicator/connection-indicator.component';
import { DoubleNeedlegaugeComponent } from './components/double-needle-gauge/double-needle-gauge.component';
import { MultipleSwitchComponent } from './components/multiple-switch/multiple-switch.component';
import { SimplegaugeComponent } from './components/simple-gauge/simple-gauge.component';
import { SingleSwitchComponent } from './components/single-switch/single-switch.component';
import { VolumetriesComponent } from './components/volumetries/volumetries.component';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ConnectionIndicatorComponent,
        DoubleNeedlegaugeComponent,
        MultipleSwitchComponent,
        SimplegaugeComponent,
        SingleSwitchComponent,
        VolumetriesComponent
      ],
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
