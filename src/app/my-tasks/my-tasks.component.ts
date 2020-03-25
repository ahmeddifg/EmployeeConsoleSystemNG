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
    assignToMeTask: TaskModel[] = [];
    userAccounts: UserAccountModel[] = [];
    selectedTaskIndex: number;
    selectedTaskId: number;
    selectedTask: TaskModel;

    myTasksSubscription: Subscription;
    deleteTasksSubscription: Subscription;
    userAccountsSubscriptions: Subscription;
    assignTasksSubscription: Subscription;
    unAssignTasksSubscription: Subscription;
    assignedToMeTasksSubscription: Subscription;
    doneTaskSubscription: Subscription;
    memberSelectedIndex;
    currentPage = 1;
    pageSize = 5

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

        this.assignedToMeTasksSubscription = this.taskService.assignedToMeTasksSubject.subscribe(data => {
            this.loaderService.hide();
            if (data) {
                this.assignToMeTask = data;
            }
        });
        this.loaderService.show();
        this.taskService.loadMyTasksService();
        this.taskService.loadTaskAssignedToMeService();
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
        this.selectedTaskId = taskId;
        swal.fire({
            title: 'Delete Task',
            text: 'Do you want to delete this task?',
            type: 'warning',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
            showCancelButton: true,
            preConfirm: () => {
                this.loaderService.show();
                this.taskService.deleteTask(this.selectedTaskId);
            }
        });
    }

    assignTask(content, task) {
        this.currentPage = 1;
        this.memberSelectedIndex = -1;
        this.selectedTask = task;
        this.projectTeamService.currentProjectId = this.selectedTask.projectId;
        this.userAccountsSubscriptions = this.projectTeamService.projectTeamAccountsSubject.subscribe(data => {
            this.userAccounts = data
        });
        if (this.projectTeamService.currentProjectId) {
            this.projectTeamService.loadProjectTeamAccounts();
        } else {
            this.projectTeamService.loadAllAccounts();
        }

        this.modalService.open(content).result.then((result) => {
            if (this.memberSelectedIndex >= 0) {
                this.assignTasksSubscription = this.taskService.assignTasksSubject.subscribe(t => {
                    this.loaderService.hide();
                    this.taskService.loadTaskAssignedToMeService();
                    this.taskService.loadMyTasksService();
                });
                this.loaderService.show();
                this.taskService.assignTask(this.selectedTask.taskId, this.userAccountsData[this.memberSelectedIndex].empId);
            }
        }, (reason) => {
        });
    }

    unAssignTask(task: TaskModel) {
        this.selectedTaskId = task.taskId;
        this.unAssignTasksSubscription = this.taskService.unAssignTasksSubject.subscribe(t => {
            this.loaderService.hide();
            this.taskService.loadTaskAssignedToMeService();
            if (t) {
                this.myTasks[this.myTasks.findIndex(e => e.taskId === t.taskId)] = t;
            }
        });
        swal.fire({
            title: 'Un-assign Task',
            text: 'Do you want to Un-assign this task?',
            type: 'warning',
            confirmButtonText: 'Yes, Do it!',
            cancelButtonText: 'Cancel',
            showCancelButton: true,
            preConfirm: () => {
                this.loaderService.show();
                this.taskService.unAssignTask(this.selectedTaskId);
            }
        });
    }

    processThisTask(task: TaskModel) {
        task.status = 2;
        this.doneTaskSubscription = this.taskService.doneTaskSubject.subscribe(d => {
            this.loaderService.hide();
        });
        swal.fire({
            title: 'Done Task',
            text: 'Do you want to complete this task?',
            type: 'question',
            confirmButtonText: 'Yes, Do it!',
            cancelButtonText: 'Cancel',
            showCancelButton: true,
            preConfirm: () => {
                this.loaderService.show();
                this.assignToMeTask.splice(this.assignToMeTask.findIndex(e => e.taskId === task.taskId), 1);
                this.myTasks[this.myTasks.findIndex(e => e.taskId === task.taskId)].status = 2;
                this.taskService.completeTask(task);
            }
        });
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

    get userAccountsData(): UserAccountModel[] {
        if (this.userAccounts.length <= 5) {
            return this.userAccounts;
        } else {
            return this.userAccounts.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
        }
    }

    onShowCompletedTasks() {
        this.router.navigate(['/tasks/completed']);
    }

    onShowAssignedTasks() {
        this.router.navigate(['/tasks/assigned']);
    }

    onShowNewTasks() {
        this.router.navigate(['/tasks/newTasks']);
    }

    onShowMyTasks() {
        this.router.navigate(['/tasks/myTasks']);
    }

}

