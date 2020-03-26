import {Component, OnInit} from '@angular/core';
import {TaskModel} from '../../shared/models/task.model';
import {Subscription} from 'rxjs';
import {TaskService} from '../../shared/services/task.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-show-completed-tasks',
    templateUrl: './show-completed-tasks.component.html',
    styleUrls: ['./show-completed-tasks.component.scss']
})
export class ShowCompletedTasksComponent implements OnInit {
    completedTasks: TaskModel[] = [];
    loadCompletedSubscription: Subscription;
    currentPage = 1;
    pageCount = 0;

    constructor(private taskService: TaskService, private router: Router) {
    }

    ngOnInit() {
        this.loadCompletedSubscription = this.taskService.loadCompletedSubscription.subscribe(tasks => {
            this.pageCount = tasks.totalPages;
            this.completedTasks = this.completedTasks.concat(tasks.content);
        });
        this.taskService.loadCompletedTasks(this.currentPage - 1);
    }

    onBack() {
        this.router.navigate(['/tasks/view']);
    }

    onLoadMore() {
        this.currentPage++;
        this.taskService.loadCompletedTasks(this.currentPage - 1)
    }

}
