import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import * as firebase from 'firebase/app';


import { FcmProvider } from '../../providers/fcm/fcm';
import { ToastController } from 'ionic-angular';
import { Subject } from 'rxjs/Subject';
import { tap } from 'rxjs/operators';


import { PatientInfoPage } from '../patient-info/patient-info';
import { PatientDicomListPage } from '../patient-dicom-list/patient-dicom-list';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
    providers: []
})

export class LoginPage implements OnInit {
    loginForm: FormGroup;
    ref = firebase.database().ref('user-type/');
    userTypeData: any;

    constructor(
        public navCtrl: NavController,
        private fb: FormBuilder,
        public fcm: FcmProvider,
        public toastCtrl: ToastController
    ) {
        alert('login => onViewDidLoad')
        // Get a FCM token
        this.fcm.getToken();
        this.fcm.listenToNotifications().pipe(
            tap(msg => {
                const toast = this.toastCtrl.create({
                    message: msg.body,
                    duration: 3000
                });
                toast.present();
            })
        ).subscribe()
    }

    ngOnInit() {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, this.noWhitespaceValidator]],
            passWord: ['', Validators.required]
        });
    }

    noWhitespaceValidator(control: FormControl) {
        let isWhitespace = (control.value || '').trim().length === 0;
        let isValid = !isWhitespace;
        return isValid ? null : { 'whitespace': true }
    }

    onSubmit(loginForm) {
        if (loginForm.valid) {
            firebase.auth().signInWithEmailAndPassword(this.loginForm.get('email').value, this.loginForm.get('passWord').value)
                .then((data) => {
                    let userData = {
                        'email': this.loginForm.get('email').value,
                        'userId': data.uid
                    };
                    window.localStorage.setItem('userInfo', JSON.stringify(userData));
                    this.getUserDetails(userData);
                })
                .catch((error) => {
                    alert('Wrong Credentials');
                });
        }
    }

    getUserDetails(userData) {
        this.ref.orderByChild('userId').equalTo(userData.userId).on('value', resp => {
            this.userTypeData = [];
            this.userTypeData = snapshotToArray(resp);
            if (this.userTypeData.length == 1) {
                if (this.userTypeData[0].type == "doc") {
                    this.navCtrl.setRoot(PatientInfoPage);
                } else {
                    this.navCtrl.setRoot(PatientDicomListPage);
                }
            }
        });
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
