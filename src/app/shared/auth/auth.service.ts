import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {activeLink} from '../services/backend-link';
import {UserAccountModel} from '../models/userAccount.model';
import {ToastrService} from 'ngx-toastr';
import {Subject} from 'rxjs';
import * as jwt_decode from 'jwt-decode'


@Injectable()
export class AuthService {
    token: string;
    userAccount: UserAccountModel;

    loginSubjcet: Subject<any> = new Subject<UserAccountModel>();
    signupSubjcet: Subject<any> = new Subject<UserAccountModel>();

    constructor(private http: HttpClient, private toastr: ToastrService) {
    }

    signupUser(userAccountModel: UserAccountModel) {
        this.http.post<UserAccountModel>(activeLink[0] + '/user/register', userAccountModel).subscribe(data => {
            this.userAccount = data;
            this.toastr.success('Register successfully.');
            this.signupSubjcet.next(data);
        }, error => {
            this.signupSubjcet.next(null);
            this.toastr.error(error.error.message);
        });
    }

    signinUser(email: string, password: string) {
        this.http.post<UserAccountModel>(activeLink[0] + '/user/login', {username: email, password: password}).subscribe((data) => {
            this.userAccount = data;
            this.toastr.success('Welcome ' + this.userAccount.userName);
            this.loginSubjcet.next(this.userAccount);
        }, error => {
            this.loginSubjcet.next(null);
            this.toastr.error(error.message);
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

    getTokenExpirationDate(token: string): Date {
        const decoded = jwt_decode(token);

        if (decoded.exp === undefined) {
            return null;
        }

        const date = new Date(0);
        date.setUTCSeconds(decoded.exp);
        return date;
    }

    isTokenExpired(token?: string): boolean {
        if (!token) {
            token = this.getToken();
        }
        if (!token) {
            return true;
        }

        const date = this.getTokenExpirationDate(token);
        if (date === undefined) {
            return false;
        }
        return !(date.valueOf() > new Date().valueOf());
    }

    isAuthenticated() {
        return this.userAccount && this.userAccount.token && !this.isTokenExpired(this.userAccount.token) ? true : false;
    }
}
