import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MyTasksComponent} from './my-tasks.component';

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
