import { Injectable, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// services
import { StartupConfigService } from './startup.config.service';

@Injectable()
export class NewsService {

    constructor(private http: HttpClient, private startupConfigService: StartupConfigService) {
    }

    globo(): Observable<any> {
        const url = `${this.startupConfigService.getConfig()}api/news`;
        return this.http.get(url);
    }
}
