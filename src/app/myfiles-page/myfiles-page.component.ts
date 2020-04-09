import {Component, OnInit, ViewChild} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {AuthService} from '../shared/auth/auth.service';
import {MyFilesService} from '../shared/services/my-files.service';
import {HttpClient} from '@angular/common/http';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FileModel} from '../shared/models/file.model';
import {Subscription} from 'rxjs';
import {FileUploader} from 'ng2-file-upload';
import swal from 'sweetalert2';

@Component({
    selector: 'app-myfiles-page',
    templateUrl: './myfiles-page.component.html',
    styleUrls: ['./myfiles-page.component.scss']
})
export class MyfilesPageComponent implements OnInit {
    myFiles: FileModel[] = [];
    @ViewChild('content', null) content;

    myPhotosSubscription: Subscription;
    public uploader: FileUploader = new FileUploader({
        url: 'http://localhost:8882/upload', itemAlias: 'file',
        additionalParameter: {userId: this.authService.userAccount.empId, folder: null, fileType: 'myFiles'},
        parametersBeforeFiles: true,
    });

    constructor(private loaderService: NgxSpinnerService, private authService: AuthService,
                private myFilesService: MyFilesService, private http: HttpClient, private modalService: NgbModal) {
    }

    ngOnInit() {
        this.myPhotosSubscription = this.myFilesService.myProfilePhotosSubject.subscribe(data => {
            if (data) {
                this.myFiles = data;
            } else {
                this.myFiles = [];
            }
        });

        this.uploader.onAfterAddingFile = (file) => {
            file.withCredentials = false;
            this.loaderService.hide();
        };
        this.uploader.onBeforeUploadItem = (file) => {
            this.loaderService.show();
        };
        this.uploader.onCompleteItem = () => {
            this.loaderService.hide();
            this.modalService.dismissAll();
            this.myFilesService.loadMyProfileFiles();
            // this.modalService.dismissAll();
        };

        this.myFilesService.loadMyProfileFiles();
    }

    openUploadFile(content) {
        this.modalService.open(content).result.then((result) => {
        });
    }

    onDeleteFile(fileId) {
        swal.fire({
            title: 'Delete File',
            text: 'Do you want to delete this Filke?',
            type: 'warning',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
            preConfirm: () => {
                this.myFilesService.deleteFile(fileId);
            }
        });
    }


}
