import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MyProjectComponent} from './my-project.component';
import {ProjectFormComponent} from './project-form/project-form.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'view',
                component: MyProjectComponent,
                data: {
                    title: 'My projects'
                }
            }, {
                path: 'form',
                component: ProjectFormComponent,
                data: {
                    title: 'My projects'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MyProjectRoutingModule {
}
