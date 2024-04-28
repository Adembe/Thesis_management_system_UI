import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError, timeout } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ProcessTandSService {
    private apiUrl = environment.apiUrl + '/processTandS';
    constructor(private http: HttpClient) {
        console.log('apiUrl: ', this.apiUrl);
    }

    getProcessAll(): Observable<any> {
        return this.http.get<any>(this.apiUrl);
    }
    getProcessTeaacher(id: any): Observable<any> {
        return this.http.get<any>(this.apiUrl + '/teacher/' + id);
    }

    updateFeedback(feedback: any): Observable<any> {
        return this.http.put<any>(this.apiUrl, feedback);
    }
}
