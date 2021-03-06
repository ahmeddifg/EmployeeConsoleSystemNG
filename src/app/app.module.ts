import {NgModule} from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppRoutingModule} from './app-routing.module';
import {SharedModule} from './shared/shared.module';
import {ToastrModule} from 'ngx-toastr';
import {HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {StoreModule} from '@ngrx/store';

import {
    PerfectScrollbarModule,
    PERFECT_SCROLLBAR_CONFIG,
    PerfectScrollbarConfigInterface
} from 'ngx-perfect-scrollbar';

import {AppComponent} from './app.component';
import {ContentLayoutComponent} from './layouts/content/content-layout.component';
import {FullLayoutComponent} from './layouts/full/full-layout.component';

import {DragulaService} from 'ng2-dragula';
import {AuthService} from './shared/auth/auth.service';
import {AuthGuard} from './shared/auth/auth-guard.service';
import {HttpAuthInterceptor} from './shared/auth/HttpAuthInterceptor';
import {NgxSpinnerModule} from 'ngx-spinner';
import {ProjectService} from './shared/services/project.service';
import {ProjectTeamService} from './shared/services/project-team.service';
import {TaskService} from './shared/services/task.service';
import {MyFilesService} from './shared/services/my-files.service';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true,
    wheelPropagation: false
};

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [AppComponent, FullLayoutComponent, ContentLayoutComponent],
    imports: [
        BrowserAnimationsModule,
        StoreModule.forRoot({}),
        AppRoutingModule,
        SharedModule,
        HttpClientModule,
        ToastrModule.forRoot(),
        NgbModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
        // AgmCoreModule.forRoot({
        //     apiKey: 'YOUR KEY'
        // }),
        PerfectScrollbarModule,
        NgxSpinnerModule
    ],
    providers: [
        AuthService, ProjectTeamService,
        AuthGuard, MyFilesService,
        DragulaService, ProjectService, TaskService,
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpAuthInterceptor,
            multi: true
        },
        {provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
