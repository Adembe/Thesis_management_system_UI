import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ProcessService {
    private apiUrl = environment.apiUrl + '/process';
    constructor(private http: HttpClient) {
        console.log('apiUrl: ', this.apiUrl);
    }

    insertComfirmRequest(thesis: any): Observable<any> {
        return this.http.put<any>(this.apiUrl, thesis);
    }

    getProcessStudent(id: any): Observable<any> {
        return this.http.get<any>(this.apiUrl + '/student' + id);
    }

    getProcessAll(): Observable<any> {
        return this.http.get<any>(this.apiUrl + '/all');
    }
    getProcessTeaacher(id: any): Observable<any> {
        return this.http.get<any>(this.apiUrl + '/teacher' + id);
    }
}
