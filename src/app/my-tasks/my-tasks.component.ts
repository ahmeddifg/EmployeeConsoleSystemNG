import {Component, OnInit} from '@angular/core';
import {TaskModel} from '../shared/models/task.model';
import {TaskService} from '../shared/services/task.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {NgxSpinnerService} from 'ngx-spinner';
import swal from 'sweetalert2';
import {ProjectTeamService} from '../shared/services/project-team.service';
import {UserAccountModel} from '../shared/models/userAccount.model';
import * as _ from 'lodash';
import {ProjectTeamModel} from '../shared/models/projectTeam.model';
import {ToastrService} from 'ngx-toastr';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-my-tasks',
    templateUrl: './my-tasks.component.html',
    styleUrls: ['./my-tasks.component.scss']
})
export class MyTasksComponent implements OnInit {
    myTasks: TaskModel[] = [];
    projectTeamAvailable: ProjectTeamModel[] = [];
    selectedTaskIndex: number;
    selectedTaskId: number;
    selectedTeamIndex: number;

    myTasksSubscription: Subscription;
    deleteTasksSubscription: Subscription;
    projectTeamSubject: Subscription;

    constructor(private taskService: TaskService, private router: Router,
                private loaderService: NgxSpinnerService, private projectTeamService: ProjectTeamService,
                private toast: ToastrService, private modalService: NgbModal) {
    }

    ngOnInit() {
        this.loaderService.show();
        this.myTasksSubscription = this.taskService.myTasksSubject.subscribe(tasks => {
            this.loaderService.hide();
            if (tasks) {
                this.myTasks = tasks;
            }
        });

        this.deleteTasksSubscription = this.taskService.deleteTaskSubject.subscribe(task => {
            this.loaderService.hide();
            if (task) {
                this.myTasks.splice(this.myTasks.findIndex(e => e.taskId === task.taskId), 1)
            }
        });
        this.taskService.loadMyTasksService();
    }

    addTask() {
        this.taskService.selectTask = null;
        this.router.navigate(['/tasks/form']);
    }

    editTask(task: TaskModel) {
        this.taskService.selectTask = task;
        this.router.navigate(['/tasks/form']);
    }

    deleteTask(taskId: number) {
        this.selectedTaskIndex = taskId;
        swal.fire({
            title: 'Delete Task',
            text: 'Do you want to delete this task?',
            type: 'warning',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
            preConfirm: () => {
                this.loaderService.show();
                this.taskService.deleteTask(this.selectedTaskId);
            }
        });
    }

    assignTask(content, taskIndex) {
        this.selectedTaskIndex = taskIndex;
        this.projectTeamSubject = this.projectTeamService.projectTeamSubject.subscribe(team => {
            this.projectTeamAvailable = team;
            this.loaderService.hide();
            this.modalService.open(content).result.then((result) => {
                if (_.isEmpty(this.selectedTeamIndex)) {
                    this.toast.error('Please select project team member!')
                } else {
                }
            }, (reason) => {
            });
        });
        if (this.newTasks[this.selectedTaskIndex]) {
            this.projectTeamService.loadProjectTeam(this.newTasks[this.selectedTaskIndex].projectId);
        }
    }

    get newTasks(): TaskModel[] {
        return this.myTasks.filter(t => t.status === 0);
    }

    get assignTasks(): TaskModel[] {
        return this.myTasks.filter(t => t.status === 1);
    }

    get completedTasks(): TaskModel[] {
        return this.myTasks.filter(t => t.status === 2);
    }
}

