import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TaskModel} from '../../shared/models/task.model';
import {TaskService} from '../../shared/services/task.service';
import {ProjectService} from '../../shared/services/project.service';
import {ProjectModel} from '../../shared/models/project.model';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {AuthService} from '../../shared/auth/auth.service';
import {data} from '../../shared/data/smart-data-table';
import swal from 'sweetalert2';

@Component({
    selector: 'app-new-task',
    templateUrl: './new-task.component.html',
    styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {
    taskForm: FormGroup;
    currentTask: TaskModel;
    myAdminProjects: ProjectModel[];
    isTaskProject: Boolean = false;
    isBackToAll;
    myAdminProjectsSubscription: Subscription;
    addTaskSubscription: Subscription;

    constructor(private taskService: TaskService, private authService: AuthService,
                private projectService: ProjectService,
                private router: Router, private loaderService: NgxSpinnerService, private activeRouter: ActivatedRoute) {
    }

    ngOnInit() {
        this.activeRouter.queryParams.subscribe(d => {
            this.isBackToAll = d.type;
        });
        this.loaderService.show();
        this.currentTask = this.taskService.selectTask;
        this.isTaskProject = null;
        if (this.currentTask && this.currentTask.projectId) {
            this.isTaskProject = true;
        }

        this.myAdminProjectsSubscription = this.projectService.myProjectsAdminSubject.subscribe(projects => {
            this.loaderService.hide();
            if (projects) {
                this.myAdminProjects = projects;
            }
        });

        if (this.taskService.selectTask) {
            this.taskForm = new FormGroup({
                'taskId': new FormControl(this.currentTask.taskId),
                'taskDesc': new FormControl(this.currentTask.taskDesc, [Validators.required]),
                'taskType': new FormControl(this.currentTask.taskType, [Validators.required]),
                'status': new FormControl(this.currentTask.status),
                'taskOwnerId': new FormControl(this.currentTask.taskOwnerId),
                'projectId': new FormControl(this.currentTask.projectId),
                'assignedToId': new FormControl(this.currentTask.assignedToId),
                'assignedDate': new FormControl(this.currentTask.assignedDate),
                'createdDate': new FormControl(this.currentTask.createdDate)
            }, {updateOn: 'change'});
        } else {
            this.taskForm = new FormGroup({
                'taskId': new FormControl(0),
                'taskDesc': new FormControl('', [Validators.required]),
                'taskType': new FormControl('', [Validators.required]),
                'status': new FormControl(1),
                'taskOwnerId': new FormControl(null),
                'projectId': new FormControl(null),
                'assignedToId': new FormControl(null),
                'assignedDate': new FormControl(null),
                'createdDate': new FormControl(null)
            }, {updateOn: 'change'});
        }
        this.projectService.loadMyProjectsAsAdmin();
    }

    onSaveTask() {
        if (this.currentTask == null) {
            this.taskForm.value.taskOwnerId = this.authService.userAccount.empId;
        }
        this.addTaskSubscription = this.taskService.addTasksSubject.subscribe(task => {
            if (this.isBackToAll) {
                this.router.navigate(['/tasks/' + this.isBackToAll]);
            } else {
                this.router.navigate(['/tasks/view']);
            }
        });
        this.taskService.addTask(this.taskForm.value);
    }

    onselectProjectCheck() {
        if (this.isTaskProject) {
            this.isTaskProject = false;
        } else {
            this.isTaskProject = true;
        }
    }

    onCancel() {
        if (this.isBackToAll) {
            this.router.navigate(['/tasks/' + this.isBackToAll]);
        } else {
            this.router.navigate(['/tasks/view']);
        }
    }



}
