import {Component, OnInit} from '@angular/core';
import {UserInfoModel} from '../shared/models/userInfo.model';

@Component({
    selector: 'app-my-profile',
    templateUrl: './my-profile.component.html',
    styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

    currentPage = 'About';
    userProfile: UserInfoModel;

    ngOnInit() {
        this.userProfile = new UserInfoModel(11, 'Application Developer', 'my name is ahmed', 'Ahmed',
            'Dif', 'dis@gmail.com', 'Male', '0531464928', 'java , javascript', '12-12-2019', 10);
    }

    showPage(page: string) {
        console.log(page);
        this.currentPage = page;
    }
}
