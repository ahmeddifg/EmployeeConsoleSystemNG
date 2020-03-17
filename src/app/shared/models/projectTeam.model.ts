import {UserAccountModel} from './userAccount.model';
import {ProjectTeamPkModel} from './projectTeamPk.model';

export interface ProjectTeamModel {
    projectTeamPk: ProjectTeamPkModel;
    role: string;
    empAccount?: UserAccountModel;
}
