import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ProjectModel} from '../shared/models/project.model';
import {ProjectService} from '../shared/services/project.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-my-project',
    templateUrl: './my-project.component.html',
    styleUrls: ['./my-project.component.scss']
})
export class MyProjectComponent implements OnInit {
    projectSubscription: Subscription;
    projects: ProjectModel[];

    constructor(private router: Router, private projectService: ProjectService) {
    }

    ngOnInit() {
        this.projectSubscription = this.projectService.MyProjectTypeSubject.subscribe(myProjects => {
            this.projects = myProjects;
        });
        this.projectService.loadMyProjects();
    }

    projectDetails(project: ProjectModel) {
        if (project != null) {
            this.projectService.currentSelectedProjectId = project.projectId;
        } else {
            this.projectService.currentSelectedProjectId = -1;
        }
        this.router.navigate(['/project/form'], {relativeTo: null})
    }
}
