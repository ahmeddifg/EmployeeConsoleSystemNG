import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ChartistModule} from 'ng-chartist';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatchHeightModule} from '../shared/directives/match-height.directive';

import {MyProjectRoutingModule} from './myproject-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MyProjectComponent} from './my-project.component';
import {ProjectFormComponent} from './project-form/project-form.component';
import {ProjectRequirementsComponent} from './project-requirements/project-requirements.component';
import {NouisliderModule} from 'ng2-nouislider';


@NgModule({
    imports: [
        CommonModule,
        MyProjectRoutingModule,
        ChartistModule,
        NgbModule,
        MatchHeightModule,
        ReactiveFormsModule,
        NouisliderModule,
        FormsModule
    ],
    exports: [],
    declarations: [
        MyProjectComponent, ProjectFormComponent, ProjectRequirementsComponent
    ],
    providers: [],
})
export class MyProjectModule {
}
