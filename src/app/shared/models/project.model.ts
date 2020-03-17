import {ProjectTypeModel} from './projectType.model';
import {ProjectRequirementModel} from './projectRequirement.model';
import {ProjectTeamModel} from './projectTeam.model';

export interface ProjectModel {
    projectId: number;
    projectName: string;
    projectShortDesc: string;
    projectMainType: number;
    projectType?: ProjectTypeModel;
    projectRequirements: ProjectRequirementModel[];
    projectTeam: ProjectTeamModel[];
}
