import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ChartistModule} from 'ng-chartist';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatchHeightModule} from '../shared/directives/match-height.directive';

import {EditProfileComponent} from './edit-profile/edit-profile.component';
import {MyprofileRoutingModule} from './myprofile-routing.module';
import {MyProfileComponent} from './my-profile.component';
import {ReactiveFormsModule} from '@angular/forms';
import {FileSelectDirective, FileUploadModule} from 'ng2-file-upload';
import {SharedModule} from '../shared/shared.module';


@NgModule({
    imports: [
        CommonModule,
        MyprofileRoutingModule,
        ChartistModule,
        NgbModule,
        MatchHeightModule,
        ReactiveFormsModule,
        FileUploadModule,
        SharedModule
    ],
    exports: [],
    declarations: [
        MyProfileComponent ,
        EditProfileComponent],
    providers: [],
})
export class MyProfileModule {
}
