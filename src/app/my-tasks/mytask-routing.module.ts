import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MyTasksComponent} from './my-tasks.component';
import {NewTaskComponent} from './new-task/new-task.component';
import {ShowCompletedTasksComponent} from './show-completed-tasks/show-completed-tasks.component';
import {ShowAssignedTasksComponent} from './show-assigned-tasks/show-assigned-tasks.component';
import {ShowNewTasksComponent} from './show-new-tasks/show-new-tasks.component';
import {ShowMyTasksComponent} from './show-my-tasks/show-my-tasks.component';

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
            },
            {
                path: 'completed',
                component: ShowCompletedTasksComponent,
                data: {
                    title: 'completed tasks'
                }
            },
            {
                path: 'assigned',
                component: ShowAssignedTasksComponent,
                data: {
                    title: 'assigned tasks'
                }
            },
            {
                path: 'newTasks',
                component: ShowNewTasksComponent,
                data: {
                    title: 'new tasks'
                }
            },
            {
                path: 'myTasks',
                component: ShowMyTasksComponent,
                data: {
                    title: 'my tasks'
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
