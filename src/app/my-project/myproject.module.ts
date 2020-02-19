import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ChartistModule} from 'ng-chartist';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatchHeightModule} from '../shared/directives/match-height.directive';

import {MytaskRoutingModule} from './mytask-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {MyProfileComponent} from '../my-profile/my-profile.component';


@NgModule({
    imports: [
        CommonModule,
        MytaskRoutingModule,
        ChartistModule,
        NgbModule,
        MatchHeightModule,
        ReactiveFormsModule
    ],
    exports: [],
    declarations: [
       MyProfileComponent
    ],
    providers: [],
})
export class MyprojectModule {
}
