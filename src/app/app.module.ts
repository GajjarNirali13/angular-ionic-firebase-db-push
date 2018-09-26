import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';


import { SplashScreen } from '@ionic-native/splash-screen';
import { File } from '@ionic-native/file';
import { StatusBar } from '@ionic-native/status-bar';
import { Push } from '@ionic-native/push';
import { Firebase } from '@ionic-native/firebase';


import { MatButtonModule } from '@angular/material';
import { MatDialogModule } from '@angular/material';
import { MatIconModule } from '@angular/material';
import { MatMenuModule } from '@angular/material';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule } from '@angular/material';


import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';


import { MyApp } from './app.component';
import { DicomPage } from '../pages/dicom/dicom';
import { LoginPage } from '../pages/login/login';
import { PatientInfoPage } from '../pages/patient-info/patient-info';
import { PatientSymptomsPage } from '../pages/patient-symptoms/patient-symptoms';
import { PatientDicomListPage } from '../pages/patient-dicom-list/patient-dicom-list';
import { DwvComponent } from '../pages/dwv/dwv.component';
import { TagsDialogComponent } from '../pages/dwv/tags-dialog.component';
import { TagsTableComponent } from '../pages/dwv/tags-table.component';
import { FcmProvider } from '../providers/fcm/fcm';


const config = {
    apiKey: "AIzaSyALj_5U2QgRbm6TTUpPgC6bjEQPlTKO4QQ",
    authDomain: "dicom-viewer-4a274.firebaseapp.com",
    databaseURL: "https://dicom-viewer-4a274.firebaseio.com",
    projectId: "dicom-viewer-4a274",
    storageBucket: "",
    messagingSenderId: "1077248551548"
};


@NgModule({
    declarations: [
        MyApp,
        DicomPage,
        LoginPage,
        PatientInfoPage,
        PatientSymptomsPage,
        PatientDicomListPage,
        DwvComponent,
        TagsDialogComponent,
        TagsTableComponent
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        AngularFireModule.initializeApp(config),
        AngularFirestoreModule,
        BrowserModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        MatMenuModule,
        MatProgressBarModule,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatFormFieldModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        DicomPage,
        LoginPage,
        PatientInfoPage,
        PatientSymptomsPage,
        PatientDicomListPage,
        TagsDialogComponent
    ],
    exports: [
        DwvComponent
    ],
    providers: [
        StatusBar,
        File,
        Firebase,
        Push,
        SplashScreen,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        FcmProvider
    ]
})
export class AppModule { }