import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {activeLink} from '../services/backend-link';
import {UserAccountModel} from '../models/userAccount.model';
import {ToastrService} from 'ngx-toastr';
import {Subject} from 'rxjs';

@Injectable()
export class AuthService {
    token: string;
    userAccount: UserAccountModel;

    loginSubjcet: Subject<any> = new Subject<UserAccountModel>();

    constructor(private http: HttpClient, private toastr: ToastrService) {
    }

    signupUser(email: string, password: string) {
    }

    signinUser(email: string, password: string) {
        this.http.post<UserAccountModel>(activeLink[0] + '/user/login', {username: email, password: password}).subscribe((data) => {
            this.userAccount = data;
            this.toastr.success('Welcome ' + this.userAccount.userName);
            this.loginSubjcet.next(this.userAccount);
        }, error => {
            this.loginSubjcet.next(null);
            this.toastr.error(error.error.message);
        });
    }

    logout() {
        this.loginSubjcet.next(null);
        this.userAccount = null;
        this.token = null;
    }

    getToken() {
        return this.token;
    }

    isAuthenticated() {
        return true;
    }
}
