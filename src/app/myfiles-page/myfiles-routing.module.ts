import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MyfilesPageComponent} from './myfiles-page.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'view',
                component: MyfilesPageComponent,
                data: {
                    title: 'My files'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MyfilesRoutingModule {
}
