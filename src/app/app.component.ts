import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase';
import { Push, PushObject, PushOptions } from '@ionic-native/push';

import { LoginPage } from '../pages/login/login';

const config = {
	apiKey: "AIzaSyALj_5U2QgRbm6TTUpPgC6bjEQPlTKO4QQ",
	authDomain: "dicom-viewer-4a274.firebaseapp.com",
	databaseURL: "https://dicom-viewer-4a274.firebaseio.com",
	projectId: "dicom-viewer-4a274",
	storageBucket: "",
	messagingSenderId: "1077248551548"
};


@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	rootPage: any = LoginPage;
	
	constructor(
		platform: Platform,
		statusBar: StatusBar,
		splashScreen: SplashScreen,
		private push: Push
	) {
		platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			statusBar.styleDefault();
			splashScreen.hide();
		});
		firebase.initializeApp(config);
		//this.pushSetUp();
	}


	pushSetUp() {
		alert('pushSetup');
		const options: PushOptions = {
			android: {
				senderID: '1077248551548',
			},
			ios: {
				alert: 'true',
				badge: true,
				sound: 'false'
			}			
		};

		const pushObject: PushObject = this.push.init(options);


		pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));

		pushObject.on('registration').subscribe((registration: any) => {alert('device registered');console.log('Device registered', registration)});

		pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
	}
}

