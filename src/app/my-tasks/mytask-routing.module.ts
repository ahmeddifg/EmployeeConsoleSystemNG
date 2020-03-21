import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MyTasksComponent} from './my-tasks.component';
import {NewTaskComponent} from './new-task/new-task.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'view',
                component: MyTasksComponent,
                data: {
                    title: 'My Tasks'
                }
            },
            {
                path: 'form',
                component: NewTaskComponent,
                data: {
                    title: 'add task'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MytaskRoutingModule {
}
