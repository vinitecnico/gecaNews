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
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateX(-80%)'}),
        animate('300ms ease-in', style({transform: 'translateX(20%)'}))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({transform: 'translateY(0)'}))
      ])
    ])
  ]
})
export class AppComponent {
  data: any;
  item: any;
  dateNow;
  showAnimation: boolean;

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
    this.showAnimation = false;
    return this.newsService.globo()
      .subscribe(async (response: any) => {
        this.data = [];
        this.data = response;

        this.item = this.data[0];
        let index = 0;
        this.showAnimation = true;

        //emit value in sequence every 1 second
        const source = interval(13000);
        const subscribe = source.subscribe(val => {
          index++;
          this.item = null;
          this.showAnimation = false;
          if (index < this.data.length) {
            setTimeout(() => {
              this.showAnimation = true;
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
