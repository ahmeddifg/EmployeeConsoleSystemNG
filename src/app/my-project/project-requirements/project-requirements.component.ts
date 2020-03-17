import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ProjectModel} from '../../shared/models/project.model';
import {ProjectService} from '../../shared/services/project.service';
import {Subscription} from 'rxjs';
import {ProjectRequirementModel} from '../../shared/models/projectRequirement.model';
import {NgxSpinnerService} from 'ngx-spinner';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import * as _ from 'lodash';
import swal from 'sweetalert2';


@Component({
    selector: 'app-project-requirements',
    templateUrl: './project-requirements.component.html',
    styleUrls: ['./project-requirements.component.scss']
})
export class ProjectRequirementsComponent implements OnInit, OnDestroy {
    @Input() currentProject: ProjectModel;
    projectRequirementsSubscription: Subscription;
    projectRequirementSubscription: Subscription;
    projectRequirements: ProjectRequirementModel[];
    reqDesc;
    reqPriority;
    reqId;
    public RangeConfig: any = {
        behaviour: 'drag',
        connect: true,
        step: 1,
        range: {
            min: 1,
            max: 10
        },
        pips: {
            mode: 'steps'
        }
    };

    constructor(public projectService: ProjectService, private loaderService: NgxSpinnerService,
                private modalService: NgbModal, private toastr: ToastrService) {
    }

    ngOnInit() {
        this.loaderService.show();
        this.projectRequirementsSubscription = this.projectService.projectRequirementsSubject.subscribe(reqs => {
            this.projectRequirements = reqs;
            this.loaderService.hide();
        });
        this.projectService.loadProjectRequirements(this.currentProject.projectId);
    }


    onAddRequirement(content) {
        this.reqId = 0;
        this.reqDesc = '';
        this.reqPriority = 5;
        this.modalService.open(content).result.then((result) => {
            if (_.isEmpty(this.reqDesc)) {
                this.toastr.error('Please enter requirement description.')
            } else {
                this.onSaveReq();
            }
        }, (reason) => {
        });
    }


    onSaveReq() {
        this.loaderService.show();
        this.projectRequirementSubscription = this.projectService.projectRequirementSubject.subscribe(req => {
            this.loaderService.hide();
        });
        this.projectService.saveProjectRequirement({
            reqId: this.reqId,
            reqDesc: this.reqDesc,
            reqPriority: this.reqPriority,
            projectId: this.currentProject.projectId
        });
    }

    onEditRequirement(req: ProjectRequirementModel, content) {
        this.reqId = req.reqId;
        this.reqDesc = req.reqDesc;
        this.reqPriority = req.reqPriority;
        this.modalService.open(content).result.then((result) => {
            if (_.isEmpty(this.reqDesc)) {
                this.toastr.error('Please enter requirement description.')
            } else {
                this.onSaveReq();
            }
        }, (reason) => {
        });
    }

    onDeleteAction(req: ProjectRequirementModel) {
        swal.fire({
            title: 'Delete Requirement',
            text: 'Do you want to delete this requirement?',
            type: 'warning',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
            preConfirm: () => {
                this.projectService.deleteRequirement(req);
            }
        });
    }

    ngOnDestroy(): void {
        if (this.projectRequirementsSubscription) {
            this.projectRequirementsSubscription.unsubscribe();
        }
        if (this.projectRequirementSubscription) {
            this.projectRequirementSubscription.unsubscribe();
        }
    }
}
