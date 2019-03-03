import { Component, OnInit, Inject } from '@angular/core';

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

  constructor(private newsService: NewsService) {

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
        this.data = response ? response.articles : [];
        this.i = 0;
        this.item = this.data[this.i];

        setInterval(() => {
          this.i++;
          if (this.i < this.data.length) {
            this.item = this.data[this.i];
          } else {
            this.newsService.globo();
          }
        }, 12000);

      }, (error) => {
        console.log(error);
      });
  }

}
