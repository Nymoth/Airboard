import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'abd-double-needle-gauge',
  templateUrl: './double-needle-gauge.component.html',
  styleUrls: ['./double-needle-gauge.component.scss']
})
export class DoubleNeedlegaugeComponent implements OnInit, OnChanges {

  @Input() value: number;
  @Input() divisor: number;
  @Input() caption: string;

  mainNeedleAngle: SafeStyle;
  secondaryNeedleAngle: SafeStyle;
  markers: number[];

  constructor(private domSanitizer: DomSanitizer) {
    this.mainNeedleAngle = this.domSanitizer.bypassSecurityTrustStyle('rotateZ(0)');
    this.secondaryNeedleAngle = this.domSanitizer.bypassSecurityTrustStyle('rotateZ(0)');
    this.markers = [];
  }

  ngOnInit() {
    for (let i = 0; i < 10; i++) {
      this.markers[i] = (this.divisor * i);
    }
  }

  ngOnChanges() {
    const thousands = Math.floor(this.value / 1000);
    const hundreds = (this.value - (thousands * 1000)) / 100;

    const mainAngle = (360 * thousands) / (this.divisor * 10);
    const secondaryAngle = (360 * hundreds) / (this.divisor * 10);

    this.mainNeedleAngle = this.domSanitizer.bypassSecurityTrustStyle(`rotateZ(${mainAngle}deg)`);
    this.secondaryNeedleAngle = this.domSanitizer.bypassSecurityTrustStyle(`rotateZ(${secondaryAngle}deg)`);
  }

}
