import {Component, OnInit} from '@angular/core';
import {TaskModel} from '../../shared/models/task.model';
import {Subscription} from 'rxjs';
import {TaskService} from '../../shared/services/task.service';
import {Router} from '@angular/router';
import swal from 'sweetalert2';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
    selector: 'app-show-assigned-tasks',
    templateUrl: './show-assigned-tasks.component.html',
    styleUrls: ['./show-assigned-tasks.component.scss']
})
export class ShowAssignedTasksComponent implements OnInit {
    assignedTasks: TaskModel[] = [];
    loadAssignedSubscription: Subscription;
    unAssignTasksSubscription: Subscription;
    deleteTasksSubscription: Subscription;
    currentPage = 1;
    pageCount = 0;
    selectedTaskId;

    constructor(private taskService: TaskService, private router: Router, private loaderService: NgxSpinnerService) {
    }

    ngOnInit() {
        this.deleteTasksSubscription = this.taskService.deleteTaskSubject.subscribe(task => {
            this.loaderService.hide();
            if (task) {
                this.assignedTasks.splice(this.assignedTasks.findIndex(e => e.taskId === task.taskId), 1)
            }
        });

        this.loadAssignedSubscription = this.taskService.loadAssignedSubscription.subscribe(tasks => {
            if (tasks) {
                this.pageCount = tasks.totalPages;
                this.assignedTasks = this.assignedTasks.concat(tasks.content);
            }
        });
        this.taskService.loadAssignedTasks(this.currentPage - 1);
    }

    onBack() {
        this.router.navigate(['/tasks/view']);
    }

    onLoadMore() {
        this.currentPage++;
        this.taskService.loadAssignedTasks(this.currentPage - 1)
    }

    editTask(task: TaskModel) {
        this.taskService.selectTask = task;
        this.router.navigate(['/tasks/form'], {queryParams: {type: 'assigned'}});
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

    unAssignTask(task: TaskModel) {
        this.selectedTaskId = task.taskId;
        this.unAssignTasksSubscription = this.taskService.unAssignTasksSubject.subscribe(t => {
            this.loaderService.hide();
            if (t) {
                this.assignedTasks.splice(this.assignedTasks.findIndex(e => e.taskId === t.taskId), 1);
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

}
