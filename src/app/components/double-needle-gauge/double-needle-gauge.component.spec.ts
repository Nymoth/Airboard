/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DoubleNeedlegaugeComponent } from './double-needle-gauge.component';
import { VolumetriesComponent } from '../volumetries/volumetries.component';

describe('DoubleNeedlegaugeComponent', () => {
  let component: DoubleNeedlegaugeComponent;
  let fixture: ComponentFixture<DoubleNeedlegaugeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DoubleNeedlegaugeComponent,
        VolumetriesComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoubleNeedlegaugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
