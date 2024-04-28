import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root', // This makes the service application-wide available
})

//aaa
export class UserService {
    // Change the apiUrl to a relative path that matches your proxy configuration
    private apiUrl = environment.apiUrl + '/users/';

    constructor(private http: HttpClient) {
        console.log('apiUrl: ', this.apiUrl);
    }

    getUsers(): Observable<any[]> {
        const headers = new HttpHeaders({
            Accept: 'application/json', // Ensuring JSON is expected
        });
        return this.http.get<any[]>(this.apiUrl, { headers: headers });
    }

    getUser(id: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${id}`);
    }

    createUser(user: any): Observable<any> {
        return this.http.post<any>(this.apiUrl, user);
    }

    updateUser(user: any): Observable<any> {
        return this.http.put<any>(this.apiUrl, user);
    }

    deleteUser(id: string): Observable<any> {
        return this.http.delete<any>(this.apiUrl + '/' + id);
    }
}
