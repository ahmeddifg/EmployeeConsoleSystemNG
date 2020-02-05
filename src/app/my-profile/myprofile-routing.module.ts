import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {MyProfileComponent} from './my-profile.component';
import {EditProfileComponent} from './edit-profile/edit-profile.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'view',
                component: MyProfileComponent,
                data: {
                    title: 'My profile'
                }
            },
            {
                path: 'edit',
                component: EditProfileComponent,
                data: {
                    title: 'Update profile'
                }
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MyprofileRoutingModule {
}
