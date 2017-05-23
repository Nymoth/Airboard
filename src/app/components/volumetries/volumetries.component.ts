import { Component, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'abd-volumetries',
  templateUrl: './volumetries.component.html',
  styleUrls: ['./volumetries.component.scss']
})
export class VolumetriesComponent implements OnChanges {

  @Input() value: number;

  min: number;
  max: number;
  avg: number;

  private accum: number;

  constructor() {
    this.min = Infinity;
    this.max = 0;
    this.avg = 0;
    this.accum = 0;
  }

  ngOnChanges() {
    if (this.value) {
      this.min = Math.min(this.value, this.min);
      this.max = Math.max(this.value, this.max);

      this.accum++;
      this.avg = (this.avg - this.avg / this.accum) + (this.value / this.accum);
    }
  }

}
