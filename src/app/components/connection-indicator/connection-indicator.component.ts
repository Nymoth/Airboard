import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'abd-connection-indicator',
  templateUrl: './connection-indicator.component.html',
  styleUrls: ['./connection-indicator.component.scss']
})
export class ConnectionIndicatorComponent implements OnInit {

  @Input() status: string;

  constructor() { }

  ngOnInit() {
  }

}
