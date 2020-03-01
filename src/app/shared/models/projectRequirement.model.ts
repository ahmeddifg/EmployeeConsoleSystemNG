import {ProjectTypeModel} from './projectType.model';

export interface ProjectRequirementModel {
    reqId: number;
    reqDesc: string;
    reqPriority: number;
    projectId: number;
}
