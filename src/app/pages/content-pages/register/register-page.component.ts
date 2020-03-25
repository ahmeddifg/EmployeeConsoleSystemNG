import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, NgForm, ValidatorFn, Validators} from '@angular/forms';
import {AuthService} from '../../../shared/auth/auth.service';
import {UserAccountModel} from '../../../shared/models/userAccount.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.scss']
})

export class RegisterPageComponent implements OnInit, OnDestroy {
    registerForm: FormGroup;
    userAccount: UserAccountModel;
    subscription: Subscription;
    repassword: string;
    approved: string;

    constructor(private authSerice: AuthService, private router: Router, private activeRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.userAccount = {userName: '', email: '', password: ''}
        this.registerForm = new FormGroup({
            'userName': new FormControl(this.userAccount.userName, [Validators.required]),
            'password': new FormControl(this.userAccount.password, [Validators.required]),
            'rePassword': new FormControl(this.repassword, [Validators.required]),
            'email': new FormControl(this.userAccount.email, [Validators.required]),
            'approved': new FormControl(this.approved, [Validators.required, this.validateCheckApproved])
        }, {validators: this.validatePasswordsAreEqual});
    }

    validateCheckApproved(control: AbstractControl) {
        if (control.value === true) {
            return null;
        }
        return {validateCheckApproved: true};
    }

    validatePasswordsAreEqual(formGroup: FormGroup) {
        return formGroup.get('password').value === formGroup.get('rePassword').value
            ? null : {'mismatch': true};
    }


    onSubmit() {
        this.subscription = this.authSerice.signupSubjcet.subscribe(user => {
            console.log(user);
            if (user !== null) {
                this.router.navigateByUrl('pages/login', {relativeTo: null});
            }
        });
        this.authSerice.signupUser(this.registerForm.value);
    }

    onGoLogin() {
        this.router.navigateByUrl('pages/login', {relativeTo: null});
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
