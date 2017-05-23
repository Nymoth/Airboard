/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SimplegaugeComponent } from './simple-gauge.component';
import { VolumetriesComponent } from '../volumetries/volumetries.component';

describe('SimplegaugeComponent', () => {
  let component: SimplegaugeComponent;
  let fixture: ComponentFixture<SimplegaugeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SimplegaugeComponent,
        VolumetriesComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimplegaugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
