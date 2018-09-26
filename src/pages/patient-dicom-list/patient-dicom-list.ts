import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase/app';

import { DicomPage } from '../dicom/dicom';

@Component({
    selector: 'page-patient-dicom-list',
    templateUrl: 'patient-dicom-list.html',
})
export class PatientDicomListPage {
    patientList: any;
    ref = firebase.database().ref('patient-info/')

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams
    ) {
        this.ref.orderByChild('user').on('value', resp => {
            this.patientList = [];
            this.patientList = snapshotToArray(resp);
            console.log(this.patientList);
        });
    }

    viewDicom() {
        this.navCtrl.push(DicomPage);
    }
}

export const snapshotToArray = snapshot => {
    let returnArr = [];
    snapshot.forEach(childSnapshot => {
        let item = childSnapshot.val();
        item.key = childSnapshot.key;
        returnArr.push(item);
    });
    return returnArr;
};
