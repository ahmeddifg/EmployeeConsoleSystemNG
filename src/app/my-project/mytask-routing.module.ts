import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MyProjectComponent} from './my-project.component';

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
