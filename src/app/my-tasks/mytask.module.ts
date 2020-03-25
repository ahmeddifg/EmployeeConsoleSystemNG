import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ChartistModule} from 'ng-chartist';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatchHeightModule} from '../shared/directives/match-height.directive';

import {MytaskRoutingModule} from './mytask-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MyTasksComponent} from './my-tasks.component';
import {NewTaskComponent} from './new-task/new-task.component';
import {DragulaModule} from 'ng2-dragula';
import {ShowNewTasksComponent} from './show-new-tasks/show-new-tasks.component';
import {ShowAssignedTasksComponent} from './show-assigned-tasks/show-assigned-tasks.component';
import {ShowCompletedTasksComponent} from './show-completed-tasks/show-completed-tasks.component';
import {ShowMyTasksComponent} from './show-my-tasks/show-my-tasks.component';


@NgModule({
    imports: [
        CommonModule,
        MytaskRoutingModule,
        ChartistModule,
        NgbModule,
        MatchHeightModule,
        ReactiveFormsModule,
        DragulaModule,
        FormsModule
    ],
    exports: [],
    declarations: [
        MyTasksComponent, NewTaskComponent, ShowNewTasksComponent,
        ShowAssignedTasksComponent, ShowCompletedTasksComponent, ShowMyTasksComponent
    ],
    providers: [],
})
export class MyTaskModule {
}
