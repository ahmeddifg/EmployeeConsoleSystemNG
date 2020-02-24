import {ProjectTypeModel} from './projectType.model';

export interface ProjectModel {
    projectId: number;
    projectName: string;
    projectShortDesc: string;
    projectType: ProjectTypeModel;
}
