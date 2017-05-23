import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'abd-multiple-switch',
  templateUrl: './multiple-switch.component.html',
  styleUrls: ['./multiple-switch.component.scss']
})
export class MultipleSwitchComponent implements OnInit {

  @Input() value: number;
  @Input() steps: number;

  @Output() onValueChange: EventEmitter<number>;

  divisions: number[];

  constructor() {
    this.steps = 2;
    this.divisions = [];
    this.onValueChange = new EventEmitter<number>();
  }

  ngOnInit() {
    for (let i = 0; i < this.steps; i++) {
      this.divisions.push(i);
    }
  }

  changeState(value: number) {
    this.onValueChange.emit(value);
  }

}
