import {ProjectTypeModel} from './projectType.model';
import {ProjectRequirementModel} from './projectRequirement.model';

export interface ProjectModel {
    projectId: number;
    projectName: string;
    projectShortDesc: string;
    projectMainType: number;
    projectType?: ProjectTypeModel;
    projectRequirements: ProjectRequirementModel[];

}
