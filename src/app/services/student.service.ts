import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class StudentService {
    private apiUrl = environment.apiUrl + '/student';
    constructor(private http: HttpClient) {
        console.log('apiUrl: ', this.apiUrl);
    }
    getConfThesis(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }

    updateReqThesis(body: any): Observable<any> {
        return this.http.put<any[]>(this.apiUrl, body);
    }

    myShowRequest(student_id: any): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + '/' + student_id);
    }
}
