import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {ProjectTypeModel} from '../models/projectType.model';
import {Subject} from 'rxjs';
import {activeLink} from './backend-link';
import {ProjectModel} from '../models/project.model';
import {ProjectRequirementModel} from '../models/projectRequirement.model';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {
    projectTypeSubject: Subject<ProjectTypeModel[]> = new Subject<ProjectTypeModel[]>()
    myProjectsSubject: Subject<ProjectModel[]> = new Subject<ProjectModel[]>()
    myProjectsAdminSubject: Subject<ProjectModel[]> = new Subject<ProjectModel[]>()
    addProjectSubject: Subject<ProjectModel> = new Subject<ProjectModel>();
    projectRequirementsSubject: Subject<ProjectRequirementModel[]> = new Subject<ProjectRequirementModel[]>();
    projectRequirementSubject: Subject<ProjectRequirementModel> = new Subject<ProjectRequirementModel>();
    currentSelectedProjectId: number;

    constructor(private http: HttpClient, private toastr: ToastrService) {
    }

    loadProjectById(projectId) {
        this.http.get<ProjectModel>(activeLink[0] + '/project/auth/' + projectId).subscribe(project => {
            this.addProjectSubject.next(project);
        }, error => {
            this.toastr.error(error.message);
            this.addProjectSubject.next(null);
        });
    }


    loadMyProjects() {
        this.http.get<ProjectModel[]>(activeLink[0] + '/project/auth/all').subscribe(projcets => {
            this.myProjectsSubject.next(projcets)
        }, error => {
            this.toastr.error(error.message);
            this.myProjectsSubject.next(null);
        });
    }

    loadMyProjectsAsAdmin() {
        this.http.get<ProjectModel[]>(activeLink[0] + '/project/auth/allAdmin').subscribe(projcets => {
            this.myProjectsAdminSubject.next(projcets)
        }, error => {
            this.toastr.error(error.message);
            this.myProjectsAdminSubject.next(null);
        });
    }

    loadProjectTypes() {
        this.http.get<ProjectTypeModel[]>(activeLink[0] + '/project/auth/types').subscribe(types => {
            this.projectTypeSubject.next(types);
        }, error => {
            this.toastr.error(error.message);
            this.projectTypeSubject.next(null);
        });
    }

    setProjectData(project: ProjectModel) {
        this.http.post<ProjectModel>(activeLink[0] + '/project/auth/set', project).subscribe(projectOb => {
            this.addProjectSubject.next(projectOb);
            this.toastr.success('Project saved successfully.');
        }, error => {
            this.toastr.error(error.message);
            this.addProjectSubject.next(null);
        });
    }

    loadProjectRequirements(projectId) {
        this.http.get<ProjectRequirementModel[]>(activeLink[0] + '/project/auth/req/' + projectId).subscribe((reqs) => {
            this.projectRequirementsSubject.next(reqs);
        }, error => {
            this.toastr.error(error.message);
            this.projectRequirementsSubject.next(null);
        });
    }

    saveProjectRequirement(projectReq: ProjectRequirementModel) {
        this.http.post<ProjectRequirementModel>(activeLink[0] + '/project/auth/setReq', projectReq).subscribe(req => {
            this.projectRequirementSubject.next(req);
            this.toastr.success('Project requirement saved.');
            this.loadProjectRequirements(req.projectId);
            this.loadProjectById(req.projectId);
        }, error => {
            this.toastr.error(error.message);
            this.projectRequirementSubject.next(null);
        });
    }

    deleteRequirement(req: ProjectRequirementModel) {
        this.http.delete(activeLink[0] + '/project/auth/delReq/' + req.reqId).subscribe(req1 => {
            if (req1) {
                this.toastr.success('Requirement deleted successfully.');
            }
            this.loadProjectRequirements(req.projectId);
            this.loadProjectById(req.projectId);
        }, error => {
            this.toastr.error(error.message)
            console.log(error);
        });
    }

}
