import {Component, OnInit} from '@angular/core';
import {TaskModel} from '../../shared/models/task.model';
import {Subscription} from 'rxjs';
import {TaskService} from '../../shared/services/task.service';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import swal from 'sweetalert2';
import {ProjectTeamService} from '../../shared/services/project-team.service';
import {UserAccountModel} from '../../shared/models/userAccount.model';
import {ToastrService} from 'ngx-toastr';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-show-new-tasks',
    templateUrl: './show-new-tasks.component.html',
    styleUrls: ['./show-new-tasks.component.scss']
})
export class ShowNewTasksComponent implements OnInit {
    newTasks: TaskModel[] = [];
    userAccounts: UserAccountModel[] = [];
    deleteTasksSubscription: Subscription;
    loadNewTasksSubscription: Subscription;
    userAccountsSubscriptions: Subscription;
    assignTasksSubscription: Subscription;
    currentPage = 1;
    pageCount = 0;
    selectedTaskId;
    currentPagePopup;
    memberSelectedIndex;
    selectedTask: TaskModel;
    pageSize = 5;

    constructor(private taskService: TaskService, private router: Router,
                private loaderService: NgxSpinnerService, private projectTeamService: ProjectTeamService,
                private toast: ToastrService, private modalService: NgbModal) {
    }

    ngOnInit() {
        this.deleteTasksSubscription = this.taskService.deleteTaskSubject.subscribe(task => {
            this.loaderService.hide();
            if (task) {
                this.newTasks.splice(this.newTasks.findIndex(e => e.taskId === task.taskId), 1)
            }
        });

        this.loadNewTasksSubscription = this.taskService.loadNewTasksSubscription.subscribe(tasks => {
            if (tasks) {
                this.pageCount = tasks.totalPages;
                this.newTasks = this.newTasks.concat(tasks.content);
            }
        });
        this.taskService.loadNewTasks(this.currentPage - 1);

    }

    assignTask(content, task) {
        this.currentPagePopup = 1;
        this.memberSelectedIndex = -1;
        this.selectedTask = task;
        this.projectTeamService.currentProjectId = this.selectedTask.projectId;
        this.userAccountsSubscriptions = this.projectTeamService.projectTeamAccountsSubject.subscribe(data => {
            this.userAccounts = data
        });

        this.assignTasksSubscription = this.taskService.assignTasksSubject.subscribe(t => {
            this.loaderService.hide();
            if (t) {
                this.newTasks.splice(this.newTasks.findIndex(e => e.taskId === t.taskId), 1);
            }
        });
        if (this.projectTeamService.currentProjectId) {
            this.projectTeamService.loadProjectTeamAccounts();
        } else {
            this.projectTeamService.loadAllAccounts();
        }

        this.modalService.open(content).result.then((result) => {
            if (this.memberSelectedIndex >= 0) {
                this.loaderService.show();
                this.taskService.assignTask(this.selectedTask.taskId, this.userAccountsData[this.memberSelectedIndex].empId);
            }
        }, (reason) => {
        });
    }

    get userAccountsData(): UserAccountModel[] {
        if (this.userAccounts.length <= 5) {
            return this.userAccounts;
        } else {
            return this.userAccounts.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
        }
    }


    editTask(task: TaskModel) {
        this.taskService.selectTask = task;
        this.router.navigate(['/tasks/form'], {queryParams: {type: 'newTasks'}});
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

    onBack() {
        this.router.navigate(['/tasks/view']);
    }

    onLoadMore() {
        this.currentPage++;
        this.taskService.loadNewTasks(this.currentPage - 1)
    }
}
