import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ChartistModule} from 'ng-chartist';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatchHeightModule} from '../shared/directives/match-height.directive';

import {MyfilesRoutingModule} from './myfiles-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NouisliderModule} from 'ng2-nouislider';
import {NgSelectModule} from '@ng-select/ng-select';
import {MyfilesPageComponent} from './myfiles-page.component';
import {FileUploadModule} from 'ng2-file-upload';


@NgModule({
    imports: [
        CommonModule,
        MyfilesRoutingModule,
        ChartistModule,
        NgbModule,
        MatchHeightModule,
        ReactiveFormsModule,
        NouisliderModule,
        FormsModule,
        NgSelectModule,
        FileUploadModule
    ],
    exports: [],
    declarations: [
        MyfilesPageComponent
    ],
    providers: [],
})
export class MyFilesModule {
}
