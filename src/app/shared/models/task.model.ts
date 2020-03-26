import {UserAccountModel} from './userAccount.model';
import {ProjectModel} from './project.model';

export interface TaskModel {
    taskId: number;
    taskDesc: string;
    taskType: string;
    createdDate: string;
    assignedDate: string;
    assignedToId: number;
    taskOwnerId: number;
    projectId: number;
    status: number;
    completedDate: string;
    assignedTo?: UserAccountModel;
    taskOwner?: UserAccountModel;
    project?: ProjectModel;
}
