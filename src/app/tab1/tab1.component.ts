import { Component, OnInit, DoCheck, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, ValidatorFn, AbstractControl } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material';

import { SqSelectSettingsModel, TranslateService } from 'sqvue';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.component.html',
  styleUrls: ['./tab1.component.css']
})
export class Tab1Component implements OnInit, DoCheck {

  today = Date.now();
  a  = '222';

  sqChecked = false;

  sqHidListConfig: SqSelectSettingsModel = <SqSelectSettingsModel>{};

  searchForm: FormGroup;

  LastName: string;
  FirstName: string;
  MiddleName: string;
  PatientID: string;
  NHS: string;
  SelectHID: string;
  BillingAccountNumber: string;

  sqSelectvalidationMessage: string;

  constructor( private formBuilder: FormBuilder, private translate: TranslateService ) {

    let browserLocale = 'en';
    console.log(browserLocale + '................');

    this.LastName = this.translate.getResx('LastName');
    this.FirstName = this.translate.getResx('FirstName');
    this.MiddleName = this.translate.getResx('MiddleName');
    this.PatientID = this.translate.getResx('PatientID');
    this.NHS = this.translate.getResx('NHS');
    this.SelectHID = this.translate.getResx('SelectHID');
    this.BillingAccountNumber = this.translate.getResx('BillingAccountNumber');

    this.searchForm = formBuilder.group({
      'lastName': new FormControl(),
      'firstName': new FormControl(),
      'middleName': new FormControl(),
      'checkAllCheckBox': new FormControl(),
      'hidList': new FormControl(),
      'patientId': new FormControl(''),
      'nhsNo': new FormControl(''),
      'billAccount': new FormControl(''),
    });

  }


  ngOnInit() {
    this.sqHidListConfig.dataSource = [
      { value: 'HID1', viewValue: 'HID1' },
      { value: 'HID2', viewValue: 'HID3' },
      { value: 'HID3', viewValue: 'HID3' }
      ];

   }
  ngDoCheck() {
    this.sqSelectvalidationMessage = this.searchForm.get('hidList').hasError('required') ? 'This is Required' : '';
}

    // event emitted when checkbox is clicked
    sqChange(event: MatCheckboxChange) {
      this.sqChecked = event.checked;
      console.log('Checkbox changed to ' + this.sqChecked);
  }

  submitForm() {
      console.log(`Submit Form ${JSON.stringify(this.searchForm.value)}`);
  }

}
