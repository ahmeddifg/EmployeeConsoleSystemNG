import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {Subject} from 'rxjs';
import {TaskModel} from '../models/task.model';
import {ProjectRequirementModel} from '../models/projectRequirement.model';
import {activeLink} from './backend-link';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    myTasksSubject = new Subject<TaskModel[]>();
    addTasksSubject = new Subject<TaskModel>();
    deleteTaskSubject = new Subject<TaskModel>();
    assignedToMeTasksSubject = new Subject<TaskModel[]>();
    assignTasksSubject = new Subject<TaskModel>();
    unAssignTasksSubject = new Subject<TaskModel>();
    doneTaskSubject = new Subject<TaskModel>();
    loadCompletedSubscription = new Subject<any>();
    loadAssignedSubscription = new Subject<any>();
    loadAssignedToMeSubscription = new Subject<any>();
    loadNewTasksSubscription = new Subject<any>();

    selectTask: TaskModel = null;

    constructor(private http: HttpClient, private toast: ToastrService) {
    }

    public loadMyTasksService() {
        this.http.get<TaskModel[]>(activeLink[0] + '/task/auth/myTask').subscribe((tasks) => {
            this.myTasksSubject.next(tasks);
        }, error => {
            this.toast.error(error.message);
            this.myTasksSubject.next(null);
        });
    }

    loadTaskAssignedToMeService() {
        this.http.get<TaskModel[]>(activeLink[0] + '/task/auth/assigned').subscribe((tasks) => {
            this.assignedToMeTasksSubject.next(tasks);
        }, error => {
            this.toast.error(error.message);
            this.assignedToMeTasksSubject.next(null);
        });
    }

    public addTask(task: TaskModel) {
        this.http.post<TaskModel>(activeLink[0] + '/task/auth/myTask', task).subscribe((t) => {
            this.addTasksSubject.next(t);
            this.toast.success('Task saved successfully.');
        }, error => {
            this.toast.error(error.message);
            this.addTasksSubject.next(null);
        });
    }

    public loadProjectTasks(projectId: number) {
        this.http.get<TaskModel[]>(activeLink[0] + '/task/auth/project/task/' + projectId).subscribe((tasks) => {
            this.assignedToMeTasksSubject.next(tasks);
        }, error => {
            this.toast.error(error.message);
            this.assignedToMeTasksSubject.next(null);
        });
    }

    public deleteTask(taskId: number) {
        this.http.delete<TaskModel>(activeLink[0] + '/task/auth/myTask/' + taskId).subscribe((task) => {
            this.toast.success('Task delete successfully.');
            this.deleteTaskSubject.next(task);
        }, error => {
            this.toast.error(error.message);
            this.deleteTaskSubject.next(null);
        });
    }

    public assignTask(taskId: number, empId: number) {
        this.http.get<TaskModel>(activeLink[0] + '/task/auth/assign/' + taskId + '/' + empId).subscribe((tasks) => {
            this.assignTasksSubject.next(tasks);
            this.toast.success('Task Assigned successfully.');
        }, error => {
            this.toast.error(error.message);
            this.assignTasksSubject.next(null);
        });
    }

    unAssignTask(selectedTaskId: number) {
        this.http.get<TaskModel>(activeLink[0] + '/task/auth/unassigned/' + selectedTaskId).subscribe((tasks) => {
            this.unAssignTasksSubject.next(tasks);
            this.toast.success('Task Un-Assigned successfully.');
        }, error => {
            this.toast.error(error.message);
            this.unAssignTasksSubject.next(null);
        });
    }

    completeTask(task: TaskModel) {
        this.http.post<TaskModel>(activeLink[0] + '/task/auth/myTask/done', task).subscribe((t) => {
            this.doneTaskSubject.next(t);
            this.toast.success('Task completed successfully.');
        }, error => {
            this.toast.error(error.message);
            this.doneTaskSubject.next(null);
        });
    }


    ///////////////////////////////////////
    //////// LOAD TASKS BY PAGES //////////
    loadCompletedTasks(page: number) {
        this.http.get<any>(activeLink[0] + '/task/auth/myTask/done/' + page).subscribe((t) => {
            this.loadCompletedSubscription.next(t);
        }, error => {
            this.toast.error(error.message);
            this.loadCompletedSubscription.next(null);
        });
    }

    loadAssignedTasks(page: number) {
        this.http.get<any>(activeLink[0] + '/task/auth/myTask/assigned/' + page).subscribe((t) => {
            this.loadAssignedSubscription.next(t);
        }, error => {
            this.toast.error(error.message);
            this.loadAssignedSubscription.next(null);
        });
    }

    loadMyTasks(page: number) {
        this.http.get<any>(activeLink[0] + '/task/auth/myTask/toMe/' + page).subscribe((t) => {
            this.loadAssignedToMeSubscription.next(t);
        }, error => {
            this.toast.error(error.message);
            this.loadAssignedToMeSubscription.next(null);
        });
    }

    loadNewTasks(page: number) {
        this.http.get<any>(activeLink[0] + '/task/auth/myTask/new/' + page).subscribe((t) => {
            this.loadNewTasksSubscription.next(t);
        }, error => {
            this.toast.error(error.message);
            this.loadNewTasksSubscription.next(null);
        });
    }

    ////////////////////////////////////////////////
}
