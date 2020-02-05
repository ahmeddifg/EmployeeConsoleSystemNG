import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChartistModule} from 'ng-chartist';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatchHeightModule} from '../shared/directives/match-height.directive';

import {HomePageComponent} from './home-page.component';
import {HomeRoutingModule} from './home-routing.module';


@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule,
        ChartistModule,
        NgbModule,
        MatchHeightModule
    ],
    exports: [],
    declarations: [
        HomePageComponent
    ],
    providers: [],
})
export class HomeModule {
}
