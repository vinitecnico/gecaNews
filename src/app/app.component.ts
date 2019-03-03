import { Component, OnInit, Inject } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import * as _ from 'lodash';

// services
import { NewsService } from './services/news.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  data: any;
  item: any;
  i: number = 0;
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
    this.newsService.globo()
      .subscribe((response: any) => {
        this.data = [];
        this.data = response ? response.articles : [];
        const gecaItem = {
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
          content: 'O desembargador do Tribunal Regional Federal da 1ª Região (TRF-1) Néviton Guedes mandou suspender nesta quinta-feira (28) apurações sobre a suposta participação do advogado Zanone Manuel de Oliveira Júnior no atentado contra o presidente Jair Bolsonaro durant… [+3158 chars]'
        };
        this.data.push(gecaItem);
        this.i = 0;
        this.item = this.data[this.i];

        setInterval(() => {
          this.i++;
          if (this.i < this.data.length) {
            this.item = this.data[this.i];
          } else {
            this.getItems();
          }
        }, 14000);

      }, (error) => {
        console.log(error);
      });
  }

}
