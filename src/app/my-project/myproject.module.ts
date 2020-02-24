import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ChartistModule} from 'ng-chartist';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatchHeightModule} from '../shared/directives/match-height.directive';

import {MyProjectRoutingModule} from './myproject-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {MyProjectComponent} from './my-project.component';
import {ProjectFormComponent} from './project-form/project-form.component';


@NgModule({
    imports: [
        CommonModule,
        MyProjectRoutingModule ,
        ChartistModule,
        NgbModule,
        MatchHeightModule,
        ReactiveFormsModule
    ],
    exports: [],
    declarations: [
        MyProjectComponent, ProjectFormComponent
    ],
    providers: [],
})
export class MyProjectModule {
}
