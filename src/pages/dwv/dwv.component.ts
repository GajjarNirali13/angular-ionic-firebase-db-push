import { Component, OnInit } from '@angular/core';
import * as dwv from 'dwv';
import 'rxjs/add/operator/map'
import { File } from '@ionic-native/file';
import { LoadingController } from 'ionic-angular';
import { MatDialog } from '@angular/material';
import { TagsDialogComponent } from './tags-dialog.component';


@Component({
    selector: 'app-dwv',
    templateUrl: './dwv.component.html',
    styles: ['./dwv.component.scss']
})

export class DwvComponent implements OnInit {
    public isShow: boolean = false;
    public showBtn: boolean = false;
    public imgData: any;
    public loading: any;
    public isWeb: boolean = true;
    public tags: any;
    public versions: any;
    public tools = ['Scroll', 'ZoomAndPan', 'WindowLevel', 'Draw'];
    public selectedTool = 'Select Tool';
    public loadProgress = 0;
    public dataLoaded = false;
    private dwvApp: any;

    constructor(
        public loadingCtrl: LoadingController,
        private file: File,
        public dialog: MatDialog
    ) {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            this.isWeb = false;
        } else {
            this.isWeb = true;
        }
    }


    ngOnInit() {
        this.loading.present();
        if (this.isWeb === false) {
            this.file.checkDir(this.file.applicationDirectory, 'www/assets/series-000000')
                .then(() => {
                    this.file.listDir(this.file.applicationDirectory, 'www/assets/series-000000')
                        .then((data) => {
                            this.imgData = data;
                            this.showBtn = true;
                            this.loading.dismiss();
                            this.viewDiacom();
                        })
                        .catch((err) => {
                            this.loading.dismiss();
                            alert("Not able to read files");
                        });
                }).catch((err) => {
                    this.loading.dismiss();
                    alert('Directory doesn\'t exist');
                });
        } else {
            this.loading.dismiss();
            this.isShow = true;
            this.showBtn = true;
            this.viewDiacom();
        }

    }

    viewDiacom() {
        if (this.isWeb === false) {
            this.callForApp();
        } else {
            this.callForWeb();
        }
    }

    callForWeb() {
        var decoderScripts = {
            'jpeg2000': 'assets/dwv/decoders/pdfjs/decode-jpeg2000.js',
            'jpeg-lossless': 'assets/dwv/decoders/rii-mango/decode-jpegloss.js',
            'jpeg-baseline': 'assets/dwv/decoders/pdfjs/decode-jpegbaseline.js'
        }
        dwv.gui.getElement = dwv.gui.base.getElement;
        dwv.image.decoderScripts = decoderScripts;
        dwv.utils.decodeQuery = dwv.utils.base.decodeQuery;
        dwv.gui.getWindowSize = dwv.gui.base.getWindowSize;
        dwv.gui.refreshElement = dwv.gui.base.refreshElement;
        dwv.gui.displayProgress = function (percent) { };

        // create the dwv app
        this.dwvApp = new dwv.App();
        // initialise with the id of the container div
        this.dwvApp.init({
            "containerDivId": "dwv",
            "tools": ['Scroll', 'ZoomAndPan', 'WindowLevel', 'Draw'], // or try "ZoomAndPan",
            'fitToWindow': true,
            'shapes': ['Ruler'],
            'isMobile': true
        });

        const self = this;
        this.dwvApp.addEventListener('load-progress', function (event) {
            self.loadProgress = event.loaded;
        });
        this.dwvApp.addEventListener('load-end', function (event) {
            // set data loaded flag
            self.dataLoaded = true;
            // set dicom tags
            self.tags = self.dwvApp.getTags();
            // set the selected tool
            if (self.dwvApp.isMonoSliceData() && self.dwvApp.getImage().getNumberOfFrames() === 1) {
                self.selectedTool = 'ZoomAndPan';
            } else {
                self.selectedTool = 'Scroll';
            }
        });
        // load dicom data
        this.dwvApp.loadURLs(['/assets/series-000000/image-000000.dcm']);
    }

    callForApp() {
        var loadURLAry = [];
        this.imgData.forEach(element => {
            loadURLAry.push('assets/series-000000/' + element.name)
        });

        this.isShow = true;
        var decoderScripts = {
            'jpeg2000': 'assets/dwv/decoders/pdfjs/decode-jpeg2000.js',
            'jpeg-lossless': 'assets/dwv/decoders/rii-mango/decode-jpegloss.js',
            'jpeg-baseline': 'assets/dwv/decoders/pdfjs/decode-jpegbaseline.js'
        }
        dwv.gui.getElement = dwv.gui.base.getElement;
        dwv.image.decoderScripts = decoderScripts;
        dwv.utils.decodeQuery = dwv.utils.base.decodeQuery;
        dwv.gui.getWindowSize = dwv.gui.base.getWindowSize;
        dwv.gui.refreshElement = dwv.gui.base.refreshElement;
        dwv.gui.displayProgress = function (percent) { };

        // create the dwv app
        var app = new dwv.App();
        const self = this;

        // initialise with the id of the container div
        app.init({
            "containerDivId": "dwv",
            "tools": ['Scroll', 'ZoomAndPan', 'WindowLevel', 'Draw'], // or try "ZoomAndPan"
        });
        app.loadURLs(loadURLAry);

        app.addEventListener('load-progress', function (event) {
            self.loadProgress = event.loaded;
        });

        app.addEventListener('load-end', function (event) {
            //this.tags = app.getTags();
            self.tags = app.getTags();
        });
        // load dicom data
    }

    showTags() {
        console.log(this.tags)
        this.dialog.open(TagsDialogComponent,
            {
                width: '80%',
                height: '90%',
                data: { title: 'DICOM Tags', value: this.tags }
            }
        );
    }
}