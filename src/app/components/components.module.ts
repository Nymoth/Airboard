import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SimplegaugeComponent } from './simple-gauge/simple-gauge.component';
import { DoubleNeedlegaugeComponent } from './double-needle-gauge/double-needle-gauge.component';
import { SingleSwitchComponent } from './single-switch/single-switch.component';
import { MultipleSwitchComponent } from './multiple-switch/multiple-switch.component';
import { ConnectionIndicatorComponent } from './connection-indicator/connection-indicator.component';
import { VolumetriesComponent } from './volumetries/volumetries.component';

@NgModule({
  declarations: [
    SimplegaugeComponent,
    DoubleNeedlegaugeComponent,
    SingleSwitchComponent,
    MultipleSwitchComponent,
    ConnectionIndicatorComponent,
    VolumetriesComponent
  ],
  exports: [
    SimplegaugeComponent,
    DoubleNeedlegaugeComponent,
    SingleSwitchComponent,
    MultipleSwitchComponent,
    ConnectionIndicatorComponent,
    VolumetriesComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
