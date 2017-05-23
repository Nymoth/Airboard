import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'abd-single-switch',
  templateUrl: './single-switch.component.html',
  styleUrls: ['./single-switch.component.scss']
})
export class SingleSwitchComponent implements OnInit {

  @Input() value: boolean;

  @Output() onToggleState: EventEmitter<boolean>;

  constructor() {
    this.value = false;
    this.onToggleState = new EventEmitter<boolean>();
  }

  ngOnInit() {
  }

  toggleState() {
    this.onToggleState.emit(!this.value);
  }

}
