import {Component, OnInit} from '@angular/core';
import {UserInfoModel} from '../shared/models/userInfo.model';
import {FileUploader} from 'ng2-file-upload';
import {NgxSpinnerService} from 'ngx-spinner';
import {AuthService} from '../shared/auth/auth.service';
import {MyFilesService} from '../shared/services/my-files.service';
import {FileModel} from '../shared/models/file.model';
import {Observable, Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {activeLink} from '../shared/services/backend-link';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-my-profile',
    templateUrl: './my-profile.component.html',
    styleUrls: ['./my-profile.component.scss']
})

export class MyProfileComponent implements OnInit {

    currentPage = 'About';
    userProfile: UserInfoModel;


    constructor(private loaderService: NgxSpinnerService, private authService: AuthService,
                private myFilesService: MyFilesService, private http: HttpClient, private modalService: NgbModal) {
    }

    ngOnInit() {
        this.userProfile = new UserInfoModel(11, 'Application Developer', 'my name is ahmed', 'Ahmed',
            'Dif', 'dis@gmail.com', 'Male', '0531464928', 'java , javascript', '12-12-2019', 10);
    }

    showPage(page: string) {
        this.currentPage = page;
    }

    onSaveEditProfile(output: UserInfoModel) {
        this.userProfile = output;
        this.currentPage = 'About';
    }
}
