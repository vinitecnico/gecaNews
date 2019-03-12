import { Component, OnInit, Inject } from '@angular/core';
import { trigger, state, style, animate, transition, query } from '@angular/animations';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import * as _ from 'lodash';

// services
import { NewsService } from './services/news.service';
import { timeout } from 'q';
import { async } from '@angular/core/testing';
import { interval, Observable } from 'rxjs';
import * as $ from 'jquery';

declare const anime: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('myAnimation', [
      state('true', style({ opacity: 1, left: -100, zIndex: 2 })),
      state('void', style({ opacity: 0, left: 0, zIndex: 2 })),
      transition(':enter', animate('350ms ease-in-out')),
      transition(':leave', animate('350ms ease-in-out'))
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
    setTimeout(() => {
      this.animationLoading();
    });

    this.getItems();

    var clock = document.getElementById('real-clock');

    setInterval(function () {
      clock.innerHTML = ((new Date).toLocaleString().substr(11, 8));
    }, 1000);
  }

  animationLoading() {
    anime.timeline({ loop: true })
      .add({
        targets: '.ml8 .circle-white',
        scale: [0, 3],
        opacity: [1, 0],
        easing: "easeInOutExpo",
        rotateZ: 360,
        duration: 1100
      }).add({
        targets: '.ml8 .circle-container',
        scale: [0, 1],
        duration: 1100,
        easing: "easeInOutExpo",
        offset: '-=1000'
      }).add({
        targets: '.ml8 .circle-dark',
        scale: [0, 1],
        duration: 1100,
        easing: "easeOutExpo",
        offset: '-=600'
      }).add({
        targets: '.ml8 .letters-left',
        scale: [0, 1],
        duration: 1200,
        offset: '-=550'
      }).add({
        targets: '.ml8 .bang',
        scale: [0, 1],
        rotateZ: [45, 15],
        duration: 1200,
        offset: '-=1000'
      }).add({
        targets: '.ml8',
        opacity: 0,
        duration: 1000,
        easing: "easeOutExpo",
        delay: 1400
      });

    anime({
      targets: '.ml8 .circle-dark-dashed',
      rotateZ: 360,
      duration: 8000,
      easing: "linear",
      loop: true
    });
  }

  animationTitle() {
    setTimeout(() => {
      // Wrap every letter in a span
      $('.ml1 .letters').each(function () {
        $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
      });

      anime.timeline({ loop: false })
        .add({
          targets: '.ml1 .letter',
          scale: [0.3, 1],
          opacity: [0, 1],
          translateZ: 0,
          easing: "easeOutExpo",
          duration: 600,
          delay: function (el, i) {
            return 70 * (i + 1)
          }
        }).add({
          targets: '.ml1 .line',
          scaleX: [0, 1],
          opacity: [0.5, 1],
          easing: "easeOutExpo",
          duration: 700,
          offset: '-=875',
          delay: function (el, i, l) {
            return 80 * (l - i);
          }
        });
    });
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
        const source = interval(12000);
        const subscribe = source.subscribe(val => {
          index++;
          this.item = null;
          this.showAnimation = false;
          if (index < this.data.length) {
            setTimeout(() => {
              this.showAnimation = true;
              this.item = this.data[index];
              this.animationTitle();
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
