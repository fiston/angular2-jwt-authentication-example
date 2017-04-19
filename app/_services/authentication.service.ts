import { Injectable } from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

// import {controllerKey} from "@angular/upgrade/src/util";

@Injectable()
export class AuthenticationService {
    public token: string;

    constructor(private http: Http) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    login(username: string, password: string): Observable<boolean> {
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers }); // Create a request option
        var url='http://10.8.19.151:9966/api/auth/login';
        return Observable.fromPromise(new Promise((resolve, reject) => {
            // let formData: any = new FormData()
            let xhr = new XMLHttpRequest()

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.response))
                    } else {
                        reject(xhr.response)
                    }
                }
            }
            xhr.open("POST", url, true)
            xhr.send(JSON.stringify({ username: username, password: password }))
        }));


        // return this.http.post('http://10.8.19.151:9966/api/auth/login', JSON.stringify({ username: username, password: password }),options)
        //     .map((response: Response) => {
        //         // login successful if there's a jwt token in the response
        //         console.log("Success to authenticate"+ response.status+" ========="+response.text());
        //         let token = response.json() && response.json().token;
        //         if (token) {
        //             // set token property
        //             this.token = token;
        //
        //             // store username and jwt token in local storage to keep user logged in between page refreshes
        //             localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
        //
        //             // return true to indicate successful login
        //             return true;
        //         } else {
        //             // return false to indicate failed login
        //             console.log("Failed to authenticate");
        //             return false;
        //         }
        //     });
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }
}