import {Routes, RouterModule} from '@angular/router';


export const Full_ROUTES: Routes = [
    {
        path: 'home',
        loadChildren: () => import('../../home-page/home.module').then(m => m.HomeModule)
    },
    {
        path: 'profile',
        loadChildren: () => import('../../my-profile/myprofile.module').then(m => m.MyProfileModule)
    },
    {
        path: 'project',
        loadChildren: () => import('../../my-project/myproject.module').then(m => m.MyProjectModule)
    },
    {
        path: 'tasks',
        loadChildren: () => import('../../my-tasks/mytask.module').then(m => m.MyTaskModule)
    },
];
