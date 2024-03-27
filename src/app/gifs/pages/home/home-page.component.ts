import { Component } from '@angular/core';
import { GifsService } from '../../services/gifs.service';
import { Gif, Pagination } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-home-page',
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {

  constructor(private gifsService: GifsService) { }

  get gifs(): Gif[] {
    return this.gifsService.gifList;
  }

  // Añadido
  get pagination(): Pagination {
    return this.gifsService.pagination
  }
}
