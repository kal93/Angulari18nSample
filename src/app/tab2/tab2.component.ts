import { browser } from 'protractor';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.component.html',
  styleUrls: ['./tab2.component.css']
})
export class Tab2Component implements OnInit {

  today = Date.now();
  a  = '420.024';

  browserLocale = window.navigator.language;

  constructor() { }

  ngOnInit() {
  }

}
