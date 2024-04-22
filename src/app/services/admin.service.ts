import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AdminService {
    private apiUrl = environment.apiUrl + '/admin';
    constructor(private http: HttpClient) {
        console.log('apiUrl: ', this.apiUrl);
    }
    getUsers(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }

    deleteUser(body: any): Observable<any> {
        return this.http.put<any[]>(this.apiUrl, body);
    }

    updateUser(user_id: any): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + '/' + user_id);
    }
}
