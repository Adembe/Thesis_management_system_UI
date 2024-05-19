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
    //Shine diplomin sedev devshvvleh
    createThesis(thesis: any): Observable<any> {
        return this.http.post<any>(this.apiUrl, thesis);
    }
    //Diplomiig update hiih
    updateThesis(thesis: any): Observable<any> {
        return this.http.put<any>(this.apiUrl, thesis);
    }
    //Zowhon ooriin dewshvvlsen sedwiig awchirna
    getOwnThesis(teacher_id: any, seasonCode: any = null): Observable<any[]> {
        return this.http.get<any[]>(
            this.apiUrl + '/own/' + teacher_id + '/seasonCode/' + seasonCode
        );
    }
    //Dewshvvlsen diplomin sedwiig ustgana
    deleteThesis(id: any): Observable<any> {
        return this.http.delete<any[]>(this.apiUrl + '/' + id);
    }
    //Bvh diplominn sedwiig ustgana diplomin sedev devshvvleh
    deleteAllThesiss(ids: any): Observable<any> {
        return this.http.delete<any[]>(this.apiUrl, { body: ids });
    }

    //huselt ilgeesen oyutnuudiig haruilna
    getRequestStudents(id: any): Observable<any> {
        return this.http.get<any>(this.apiUrl + '/allrequested/' + id);
    }
}
