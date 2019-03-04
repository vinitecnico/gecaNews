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
        this.data = response ? response.articles : [];
        let gecaItem: any = {
          source: {
            id: 'globo',
            name: 'Globo'
          },
          author: 'Globo',
          title: 'Geca media digital ',
          description: `Assistida por mais de 6 milhões de passageiros diariamente, conta com mais de 6.000 monitores, sendo 48 telas em cada uma das 142 composição do metrô. Nela são transmitidas informações em tempo real, publicidade, prestações de serviços e agendas culturais, entre outros. O conteúdo produzido especificamento para DOOH utilizando de colaboração do Grupo Bandeirantes, onde suas operações foram adquiridas pelo mesmo em 2008.   
          A partir de janeiro de 2011 a mídia online está presente no Metrô de Brasília. Desde maio de 2014 atua no Trensurb, no Rio Grande do Sul, sob esta bandeira, em diversos trens e em todas estações, e desde 2012 atua nos ônibus da Carris, na Rodoviária de Porto Alegre e no Catamarã Porto Alegre-Guaíba, sob a bandeira Canal Você.
          
          O Contéudo da TVminuto também esta presente nas 5 principais capitais: no RJ na operação do BRT (Transoeste, Transolímpica e Transcarioca), em BH no BRT e ônibus convencionais e transporte público de Brasília e Curitiba.
          
          Em janeiro de 2017, o Conselho Administrativo de Defesa Econômica (CADE), em decisão publicada no Diário Oficial da União, aprovou a aquisição de 30% das operações da TV Minuto pela Eletromidia. No fim de julho de 2018, o CADE aprova a venda dos 70% restantes para a Eletromidia.`,
          url: 'https://g1.globo.com/politica/noticia/2019/03/01/desembargador-suspende-apuracoes-sobre-advogado-de-agressor-de-bolsonaro.ghtml',
          urlToImage: 'https://dyegoteless.files.wordpress.com/2015/02/mac-tvms.jpg',
          publishedAt: '2019-03-01T20:06:41.307Z',
          content: ''
        };
        this.data.push(gecaItem);

        // gecaItem = {
        //   isplayer: true,
        //   urlYoutube: 'http://www.youtube.com/embed/8Mx1SM_WrLE?autoplay=1',
        //   milliseconds: 124200,
        //   title: 'Geca media digital ',
        //   description: 'teste video',
        //   publishedAt: '2019-03-01T20:06:41.307Z'
        // };
        // this.data.push(gecaItem);
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
          }, 300);
        }, 14000);

      }, (error) => {
        console.log(error);
      });
  }
}
