import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ThesisService {
    private apiUrl = environment.apiUrl + '/thesis';
    constructor(private http: HttpClient) {
        console.log('apiUrl: ', this.apiUrl);
    }

    createThesis(thesis: any): Observable<any> {
        return this.http.post<any>(this.apiUrl, thesis);
    }
    updateThesis(thesis: any): Observable<any> {
        return this.http.put<any>(this.apiUrl, thesis);
    }

    getOwnThesis(teacher_id: any): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + '/own/' + teacher_id);
    }

    deleteThesis(id: any): Observable<any> {
        return this.http.delete<any[]>(this.apiUrl + '/' + id);
    }
    deleteAllThesiss(ids: any): Observable<any> {
        return this.http.delete<any[]>(this.apiUrl, { body: ids });
    }
}
