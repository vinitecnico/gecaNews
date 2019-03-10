import { Component, OnInit, Inject } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import * as _ from 'lodash';

// services
import { NewsService } from './services/news.service';
import { timeout } from 'q';
import { async } from '@angular/core/testing';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('animationOption', [
      transition(':enter', [
        style({ backgroundColor: '#FFFFFF' }),
        animate(200)
      ]),
      transition(':leave', [
        animate(200, style({ backgroundColor: '#FFFFFF' }))
      ]),
      state('*', style({ backgroundColor: '#FFFFFF' })),
    ])
  ]
})
export class AppComponent {
  data: any;
  item: any;
  dateNow;

  constructor(private newsService: NewsService) {
    moment.locale('pt-BR');
    this.dateNow = moment().format('dddd - DD/MMMM/YYYY');
  }

  ngOnInit() {
    this.getItems();

    var clock = document.getElementById('real-clock');

    setInterval(function () {
      clock.innerHTML = ((new Date).toLocaleString().substr(11, 8));
    }, 1000);
  }

  getItems() {
    return this.newsService.globo()
      .subscribe(async (response: any) => {
        this.data = [];
        this.data = response;
        
        this.item = this.data[0];
        let index = 0;

        let timer = setInterval(() => {
          index++;
          this.item = null;
          setTimeout(() => {
            if (index < this.data.length) {
              this.item = this.data[index];
            } else {
              this.getItems();
            }
          }, 600);
        }, 15000);

      }, (error) => {
        console.log(error);
      });
  }
}
