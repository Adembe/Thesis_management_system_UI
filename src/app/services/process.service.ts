import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError, timeout } from 'rxjs';
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
        return this.http.post<any>(this.apiUrl, thesis);
    }

    insertProcessDetail(thesis: any): Observable<any> {
        return this.http.post<any>(this.apiUrl + '/detail', thesis).pipe(
            timeout(30000), // 30000 milliseconds = 30 seconds
            catchError((error) => {
                return throwError(error);
            })
        );
    }

    getProcessStudent(id: any): Observable<any> {
        return this.http.get<any>(this.apiUrl + '/student/' + id);
    }

    getProcessAll(): Observable<any> {
        return this.http.get<any>(this.apiUrl);
    }
    getProcessTeaacher(id: any): Observable<any> {
        return this.http.get<any>(this.apiUrl + '/teacher/' + id);
    }

    getProcessDetail(processId: any): Observable<any> {
        return this.http.get<any>(this.apiUrl + '/detail/' + processId).pipe(
            timeout(30000), // 30000 milliseconds = 30 seconds
            catchError((error) => {
                return throwError(error);
            })
        );
    }

    updateFeedback(feedback: any): Observable<any> {
        return this.http.put<any>(this.apiUrl + '/student', feedback);
    }
}
