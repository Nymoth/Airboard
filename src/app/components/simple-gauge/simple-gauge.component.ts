import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'abd-simple-gauge',
  templateUrl: './simple-gauge.component.html',
  styleUrls: ['./simple-gauge.component.scss']
})
export class SimplegaugeComponent implements OnInit, OnChanges {

  @Input() value: number;
  @Input() divisor: number;
  @Input() caption: string;

  needleAngle: SafeStyle;
  markers: number[];

  constructor(private domSanitizer: DomSanitizer) {
    this.needleAngle = this.domSanitizer.bypassSecurityTrustStyle('rotateZ(0)');
    this.markers = [];
  }

  ngOnInit() {
    for (let i = 0; i < 10; i++) {
      this.markers[i] = (this.divisor * i);
    }
  }

  ngOnChanges() {
    const angle = (360 * this.value) / (this.divisor * 10);
    this.needleAngle = this.domSanitizer.bypassSecurityTrustStyle(`rotateZ(${angle}deg)`);
  }
}
