import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationStart, Router} from '@angular/router';
import {filter, map} from 'rxjs/operators';
import {Observable, Subscription} from 'rxjs';
import {ProjectModel} from '../../shared/models/project.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProjectService} from '../../shared/services/project.service';
import {ProjectTypeModel} from '../../shared/models/projectType.model';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
    selector: 'app-project-form',
    templateUrl: './project-form.component.html',
    styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit, OnDestroy {
    state: Observable<object>;
    currentProject: ProjectModel = null;
    projectForm: FormGroup;
    typeSubscription: Subscription;
    setProjectSubscription: Subscription;
    projectTypes: ProjectTypeModel[];
    activeTab = 1;

    constructor(private router: Router, private projectService: ProjectService, private loaderService: NgxSpinnerService) {
        this.loadForm();
        this.activeTab = 1;

    }

    ngOnInit() {
        // load project types
        this.loaderService.show();
        this.typeSubscription = this.projectService.projectTypeSubject.subscribe(types => {
            this.projectTypes = types;
            this.loaderService.hide();
        });
        this.projectService.loadProjectTypes();
        // load project form
        if (this.projectService.currentSelectedProjectId !== -1) {
            this.setProjectSubscription = this.projectService.addProjectSubject.subscribe(projectData => {
                if (projectData) {
                    this.currentProject = projectData;
                    this.projectForm.patchValue(this.currentProject);
                }
            });
            this.projectService.loadProjectById(this.projectService.currentSelectedProjectId);
        }

    }

    loadForm() {
        this.projectForm = new FormGroup({
            'projectId': new FormControl(0),
            'projectName': new FormControl(null, [Validators.required]),
            'projectShortDesc': new FormControl(null, [Validators.required]),
            'projectMainType': new FormControl(null, [Validators.required]),
            'projectType': new FormControl(null)
        }, {updateOn: 'change'});
    }

    onSaveProject() {
        this.currentProject = this.projectForm.value;
        this.loaderService.show();
        this.setProjectSubscription = this.projectService.addProjectSubject.subscribe(projectOb => {
            this.currentProject = projectOb;
            this.loaderService.hide();
        });
        this.projectService.setProjectData(this.currentProject);
        console.log(this.currentProject);
    }

    onCancel() {
        this.router.navigate(['/project/view'], {relativeTo: null});
    }

    ngOnDestroy(): void {
        if (this.typeSubscription) {
            this.typeSubscription.unsubscribe();
        }
        if (this.setProjectSubscription) {
            this.setProjectSubscription.unsubscribe();
        }
    }
}
