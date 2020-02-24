import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../shared/auth/auth.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent implements OnInit, OnDestroy {
    loginForm: FormGroup;
    userName: String;
    password: String;
    subscription: Subscription;

    constructor(private router: Router,
                private route: ActivatedRoute, private authService: AuthService) {
    }

    ngOnInit(): void {
        this.loginForm = new FormGroup({
            'userName': new FormControl(this.userName, [Validators.required]),
            'password': new FormControl(this.password, [Validators.required])
        });
    }

    // On submit button click
    onSubmit() {
        this.subscription = this.authService.loginSubjcet.subscribe(data => {
            if (data) {
                this.router.navigate(['/'], {relativeTo: null});
            }
        });
        this.authService.signinUser(this.loginForm.value['userName'], this.loginForm.value['password']);
    }

    // On registration link click
    onRegister() {
        this.router.navigate(['pages/register'], {relativeTo: null});
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
