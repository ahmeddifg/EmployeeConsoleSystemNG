import {RouteInfo} from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
    {
        path: '',
        title: 'Dashboard',
        icon: 'ft-home',
        class: 'has-sub',
        badge: '2',
        badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1',
        isExternalLink: false,
        submenu: [
            {
                path: '/profile/view',
                title: 'My profile',
                icon: '',
                class: '',
                badge: '',
                badgeClass: '',
                isExternalLink: false,
                submenu: []
            },
        ]
    }
];
