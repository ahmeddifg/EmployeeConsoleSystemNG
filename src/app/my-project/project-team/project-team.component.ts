import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ProjectModel} from '../../shared/models/project.model';
import {ProjectTeamModel} from '../../shared/models/projectTeam.model';
import {Subscription} from 'rxjs';
import {ProjectTeamService} from '../../shared/services/project-team.service';
import swal from 'sweetalert2';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgxSpinnerService} from 'ngx-spinner';
import * as _ from 'lodash';
import {UserAccountModel} from '../../shared/models/userAccount.model';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-project-team',
    templateUrl: './project-team.component.html',
    styleUrls: ['./project-team.component.scss']
})
export class ProjectTeamComponent implements OnInit, OnDestroy {
    projectTeam: ProjectTeamModel[] = [];
    projectTeamAvailable: UserAccountModel[] = [];
    selectMemberValueObject: ProjectTeamModel;
    selectedTeamIndex;
    @Input() currentProject: ProjectModel;

    projectTeamSubscription: Subscription;
    projectTeamAvailableSubscription: Subscription;
    setProjectTeamSubscription: Subscription;
    deleteProjectTeamSubscription: Subscription;

    constructor(private projectTeamService: ProjectTeamService, private modalService: NgbModal,
                private loaderService: NgxSpinnerService, private toast: ToastrService) {
        this.projectTeam = [];
    }

    ngOnInit() {
        this.loaderService.show();
        this.projectTeamSubscription = this.projectTeamService.projectTeamSubject.subscribe(team => {
            this.projectTeam = team;
            this.loaderService.hide();
        });

        this.projectTeamAvailableSubscription = this.projectTeamService.projectTeamAvailableSubject.subscribe(data => {
            this.projectTeamAvailable = data;
            this.loaderService.hide();
        });

        this.setProjectTeamSubscription = this.projectTeamService.setProjectTeamSubject.subscribe(member => {
            if (member) {
                this.projectTeam.push(this.selectMemberValueObject);
            }
            this.loaderService.hide();

        });

        this.deleteProjectTeamSubscription = this.projectTeamService.deleteProjectTeamSubject.subscribe(member => {
            this.loaderService.hide();
            this.projectTeam.splice(this.projectTeam.findIndex(
                e => e.projectTeamPk.empId === member.projectTeamPk.empId), 1)
        });
        this.projectTeamService.loadProjectTeam(this.currentProject.projectId);
        this.loadAvailableProjectMembers(this.currentProject.projectId);
    }

    loadAvailableProjectMembers(projectId) {
        this.projectTeamService.loadProjectAvailableTeam(projectId);
    }

    onAddMember(content) {
        this.selectedTeamIndex = null;
        this.selectMemberValueObject = {projectTeamPk: {empId: null, projectId: this.currentProject.projectId}, role: ''};
        this.loadAvailableProjectMembers(this.currentProject.projectId);
        this.modalService.open(content).result.then((result) => {
            if (_.isEmpty(this.selectedTeamIndex)) {
                this.toast.error('Please select project team member!')
            } else {
                this.loaderService.show();
                this.selectMemberValueObject.empAccount = this.projectTeamAvailable[this.selectedTeamIndex];
                this.selectMemberValueObject.projectTeamPk.empId = this.projectTeamAvailable[this.selectedTeamIndex].empId;
                this.projectTeamService.setProjectTeam(this.selectMemberValueObject);
            }
        }, (reason) => {
        });
    }

    onRemoveProjectMember(member: ProjectTeamModel) {
        swal.fire({
            title: 'Delete Project Member',
            text: 'Do you want to delete this project member?',
            type: 'warning',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
            preConfirm: () => {
                this.loaderService.show();
                this.projectTeamService.deleteProjectTeam(member);
            }
        });
    }

    ngOnDestroy(): void {
        if (this.projectTeamSubscription) {
            this.projectTeamSubscription.unsubscribe();
        }

        if (this.projectTeamAvailableSubscription) {
            this.projectTeamAvailableSubscription.unsubscribe();
        }

        if (this.setProjectTeamSubscription) {
            this.setProjectTeamSubscription.unsubscribe();
        }

        if (this.deleteProjectTeamSubscription) {
            this.deleteProjectTeamSubscription.unsubscribe();
        }
    }
}
