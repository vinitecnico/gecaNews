import { Injectable, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// const httpOptions = {
//     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
// };

@Injectable()
export class NewsService {

    constructor(private http: HttpClient) {
    }

    globo(): Observable<any> {
        const url = `https://newsapi.org/v2/top-headlines?sources=globo&apiKey=42252c2becc64c21b569ed0104fef77b`;
        // const url = 'assets/json/database.json';
        return this.http.get(url);
    }
}
