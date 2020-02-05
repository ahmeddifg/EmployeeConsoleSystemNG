import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ChartistModule} from 'ng-chartist';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatchHeightModule} from '../shared/directives/match-height.directive';

import {EditProfileComponent} from './edit-profile/edit-profile.component';
import {MyprofileRoutingModule} from './myprofile-routing.module';
import {MyProfileComponent} from './my-profile.component';


@NgModule({
    imports: [
        CommonModule,
        MyprofileRoutingModule,
        ChartistModule,
        NgbModule,
        MatchHeightModule
    ],
    exports: [],
    declarations: [
        MyProfileComponent ,
        EditProfileComponent
    ],
    providers: [],
})
export class MyProfileModule {
}
