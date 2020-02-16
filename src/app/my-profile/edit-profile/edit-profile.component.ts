import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserInfoModel} from '../../shared/models/userInfo.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-edit-profile',
    templateUrl: './edit-profile.component.html',
    styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

    @Input() userInfo: UserInfoModel;
    @Output() doneOutput = new EventEmitter<string>();
    profileForm: FormGroup;

    constructor() {
    }

    ngOnInit() {
        this.profileForm = new FormGroup({
            'email': new FormControl(this.userInfo.email, [Validators.required, Validators.email]),
            'firstName': new FormControl(this.userInfo.firstName, [Validators.required]),
            'lastName': new FormControl(this.userInfo.lastName, [Validators.required]),
            'gender': new FormControl(this.userInfo.gender, [Validators.required]),
            'phoneNumber': new FormControl(this.userInfo.phoneNumber, [Validators.required]),
            'joined': new FormControl(this.userInfo.Joined, [Validators.required]),
            'yearsEx': new FormControl(this.userInfo.yearsEx, [Validators.required]),
            'jobTitle': new FormControl(this.userInfo.jobTitle, [Validators.required]),
            'skills': new FormControl(this.userInfo.skills, [Validators.required])
        }, {updateOn: 'blur'});
    }

    onSaveProfile() {

    }

}
