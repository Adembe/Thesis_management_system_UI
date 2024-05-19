import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ThesisOfficeService {
    private apiUrl = environment.apiUrl + '/thesis-office';
    constructor(private http: HttpClient) {
        console.log('apiUrl: ', this.apiUrl);
    }
    updateThesis(thesis: any): Observable<any> {
        return this.http.put<any>(this.apiUrl, thesis);
    }
    getThesis(seasonCode: any = null): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + '/' + seasonCode);
    }
}
