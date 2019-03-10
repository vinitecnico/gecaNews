import { Injectable } from '@angular/core';

@Injectable()
export class StartupConfigService {
    value: any;

    getConfig(): string {
        const host = window.location.host;

        if (this.value) {
            return this.value;
        }

        if (host.indexOf('localhost') >= 0) {
            // dev
            this.value = 'http://localhost:4000/';
            return this.value;
        } else {
            // Prod';
            this.value = 'https://gecanewsapi.herokuapp.com/';
            return this.value;
        }
    }
}
