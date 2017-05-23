/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VolumetriesComponent } from './volumetries.component';

describe('VolumetriesComponent', () => {
  let component: VolumetriesComponent;
  let fixture: ComponentFixture<VolumetriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolumetriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolumetriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
