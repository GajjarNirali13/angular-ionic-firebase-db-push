import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl } from '@angular/forms';
import * as firebase from 'firebase/app';

import { PatientInfoPage } from '../patient-info/patient-info';

@Component({
    selector: 'page-patient-symptoms',
    templateUrl: 'patient-symptoms.html',
})
export class PatientSymptomsPage {
    patientSymptomsForm: FormGroup;
    pId: number;
    ref = firebase.database().ref('patient-symptoms/')

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams
    ) {
        this.pId = this.navParams.get('id');
        this.patientSymptomsForm = new FormGroup({
            fd: new FormControl(),
            aw: new FormControl(),
            sd: new FormControl(),
            te: new FormControl()
        });
    }

    onFormSubmit() {
        if (this.patientSymptomsForm.get('fd').value &&
            this.patientSymptomsForm.get('aw').value &&
            this.patientSymptomsForm.get('sd').value &&
            this.patientSymptomsForm.get('te').value) {
                const docDetail = JSON.parse(window.localStorage.getItem('userInfo'))
                let psId = Math.floor(Math.random() * 10000);
                let newData = this.ref.push();
                newData.set({
                    "id": psId,
                    "facialDropping": this.patientSymptomsForm.get('fd').value,
                    "armWeakness": this.patientSymptomsForm.get('aw').value,
                    "speechDifficulties": this.patientSymptomsForm.get('sd').value,
                    "callEmergency": this.patientSymptomsForm.get('te').value,
                    "docId": docDetail.userId,
                    "patientId": this.pId
                }).then((data) => {
                    alert('Data saved successfully.');
                    this.navCtrl.setRoot(PatientInfoPage);
                });
        } else {
            alert("Please select all options");
        }
    }
}