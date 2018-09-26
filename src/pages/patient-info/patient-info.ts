import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import * as firebase from 'firebase/app';

import { PatientSymptomsPage } from '../patient-symptoms/patient-symptoms';

@Component({
    selector: 'page-patient-info',
    templateUrl: 'patient-info.html',
})
export class PatientInfoPage {
    data = { nickname: "" };
    patientInfoForm: FormGroup;
    ref = firebase.database().ref('patient-info/')
    length: number;
    timestamp: any;
    _getRandomInt: any;

    constructor(
        private fb: FormBuilder,
        public navCtrl: NavController,
        public navParams: NavParams
    ) {
        this.patientInfoForm = this.fb.group({
            firstName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(25), this.noWhitespaceValidator, Validators.pattern(/^[^-\s][a-zA-Z ]+$/)]],
            lastName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(25), this.noWhitespaceValidator, Validators.pattern(/^[^-\s][a-zA-Z ]+$/)]],
            email: ['', [Validators.required, Validators.maxLength(40), Validators.pattern(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/)]],
            mobileNo: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15), Validators.pattern(/^[0-9]*\.?[0-9]*$/)]],
            address: ['']
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SignupPage');
    }

    noWhitespaceValidator(control: FormControl) {
        let isWhitespace = (control.value || '').trim().length === 0;
        let isValid = !isWhitespace;
        return isValid ? null : { 'whitespace': true }
    }

    onKeypress(e) {
        const pattern = /[0-9\+\-\ ]/;
        let inputChar = String.fromCharCode(e.charCode);

        if (!pattern.test(inputChar)) {
            // invalid character, prevent input
            event.preventDefault();
        }
    }

    save() {
        const docDetail = JSON.parse(window.localStorage.getItem('userInfo'))
        let pId = Math.floor(Math.random() * 10000);
        let newData = this.ref.push();
        newData.set({
            "id": pId,
            "email": this.patientInfoForm.get('email').value,
            "firstName": this.patientInfoForm.get('firstName').value,
            "lastName": this.patientInfoForm.get('lastName').value,
            "mobile": this.patientInfoForm.get('mobileNo').value,
            "address": this.patientInfoForm.get('address').value,
            "docId": docDetail.userId
        }).then((data) => {
            this.navCtrl.push(PatientSymptomsPage,{id: pId})
        });
    }

}