import {Injectable} from '@angular/core';
import {ProjectTeamModel} from '../models/projectTeam.model';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {activeLink} from './backend-link';
import {Toast, ToastrService} from 'ngx-toastr';
import {UserAccountModel} from '../models/userAccount.model';

@Injectable({
    providedIn: 'root'
})
export class ProjectTeamService {
    projectTeamSubject = new Subject<ProjectTeamModel[]>();
    projectTeamAvailableSubject = new Subject<UserAccountModel[]>();
    setProjectTeamSubject = new Subject<ProjectTeamModel>();
    deleteProjectTeamSubject = new Subject<ProjectTeamModel>();
    projectTeamAccountsSubject = new Subject<UserAccountModel[]>();


    currentProjectId: number;

    constructor(private http: HttpClient, private toast: ToastrService) {
    }

    loadProjectTeam(projectId: number) {
        this.http.get<ProjectTeamModel[]>(activeLink[0] + '/team/auth/all/' + projectId).subscribe(data => {
            if (data) {
                this.projectTeamSubject.next(data);
            }
        }, error => {
            this.toast.error(error.message);
            this.projectTeamSubject.next(null);
        });
    }

    loadProjectTeamAccounts() {
        this.http.get<UserAccountModel[]>(activeLink[0] + '/team/auth/allProjectAccounts/' + this.currentProjectId).subscribe(users => {
            this.projectTeamAccountsSubject.next(users);
        });
    }

    loadAllAccounts() {
        this.http.get<UserAccountModel[]>(activeLink[0] + '/team/auth/allAccounts').subscribe(users => {
            this.projectTeamAccountsSubject.next(users);
        });
    }

    loadProjectAvailableTeam(projectId: number) {
        this.http.get<UserAccountModel[]>(activeLink[0] + '/team/auth/showAccountsToAdd/' + projectId).subscribe(data => {
            if (data) {
                this.projectTeamAvailableSubject.next(data)
            }
        }, error => {
            this.toast.error(error.message);
            this.projectTeamSubject.next(null);
        });
    }

    setProjectTeam(projectTeam: ProjectTeamModel) {
        this.http.post<ProjectTeamModel>(activeLink[0] + '/team/auth/set', projectTeam).subscribe(data => {
            this.setProjectTeamSubject.next(data);
            this.toast.success('Saved successfully.');
        }, error => {
            this.toast.error(error.message);
            this.setProjectTeamSubject.next(null);
        });
    }

    deleteProjectTeam(projectTeam: ProjectTeamModel) {
        this.http.post<ProjectTeamModel>(activeLink[0] + '/team/auth/del', projectTeam).subscribe(data => {
            this.deleteProjectTeamSubject.next(data);
            this.toast.success('Delete successfully.');

        }, error => {
            this.toast.error(error.message);
            this.deleteProjectTeamSubject.next(null);
        });
    }
}
