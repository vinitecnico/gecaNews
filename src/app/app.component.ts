import { Component, OnInit, Inject } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import * as _ from 'lodash';

// services
import { NewsService } from './services/news.service';
import { timeout } from 'q';
import { async } from '@angular/core/testing';
import { interval, Observable } from 'rxjs';

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

        //emit value in sequence every 1 second
        const source = interval(13000);
        const subscribe = source.subscribe(val => {
          index++;
          this.item = null;
          if (index < this.data.length) {
            setTimeout(() => {
            this.item = this.data[index];
            }, 300);
          } else {
            setTimeout(() => {
              subscribe.unsubscribe();
              this.getItems();
            });
          }
        });
      }, (error) => {
        console.log(error);
      });
  }
}
