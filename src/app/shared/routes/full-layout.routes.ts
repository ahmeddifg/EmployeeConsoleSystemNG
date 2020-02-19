import {Routes, RouterModule} from '@angular/router';

//Route for content layout with sidebar, navbar and footer.

export const Full_ROUTES: Routes = [
    {
        path: 'home',
        loadChildren: () => import('../../home-page/home.module').then(m => m.HomeModule)
    },
    {
        path: 'profile',
        loadChildren: () => import('../../my-profile/myprofile.module').then(m => m.MyProfileModule)
    }
];
