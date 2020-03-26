import {Component, OnInit} from '@angular/core';
import {TaskModel} from '../../shared/models/task.model';
import {Subscription} from 'rxjs';
import {TaskService} from '../../shared/services/task.service';
import {Router} from '@angular/router';
import swal from 'sweetalert2';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
    selector: 'app-show-my-tasks',
    templateUrl: './show-my-tasks.component.html',
    styleUrls: ['./show-my-tasks.component.scss']
})
export class ShowMyTasksComponent implements OnInit {
    myTasks: TaskModel[] = [];
    doneTaskSubscription: Subscription;
    currentPage = 1;
    pageCount = 0;

    constructor(private taskService: TaskService, private router: Router, private loaderService: NgxSpinnerService) {
    }

    ngOnInit() {
        this.doneTaskSubscription = this.taskService.loadAssignedToMeSubscription.subscribe(tasks => {
            this.pageCount = tasks.totalPages;
            this.myTasks = this.myTasks.concat(tasks.content);
        });
        this.taskService.loadMyTasks(this.currentPage - 1)
    }

    onBack() {
        this.router.navigate(['/tasks/view']);
    }

    onLoadMore() {
        this.currentPage++;
        this.taskService.loadMyTasks(this.currentPage - 1)
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
                this.myTasks.splice(this.myTasks.findIndex(e => e.taskId === task.taskId), 1);
                this.taskService.completeTask(task);
            }
        });
    }

}
