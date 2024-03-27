import { Component } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private gifsService:GifsService){}

  get tags():string[]{
    return this.gifsService.tagsHistory
  }
  searchTag(tag:string){
    // this.gifsService.searchTag(tag);
    this.gifsService.searchTag(tag, 0)
    this.show = false
  }
    // Borra la lista completa al llamar al método deleteList() del objeto gifsService
  // y establece la propiedad show en false
  public deleteList(): void {
    this.gifsService.deleteList();
    this.show = false;
  }

  // Borra la etiqueta especificada llamando al método deleteTag() del objeto gifsService
  // con el parámetro tag proporcionado y establece la propiedad show en false
  public deleteTag(tag: string): void {
    this.gifsService.deleteTag(tag);
    this.show = false;
  }

  // Alterna la visibilidad del menú al establecer la propiedad show en su valor opuesto
  public menu(): void {
    if (!this.show) {
      this.show = true;
    } else {
      this.show = false;
    }
  }
  // La propiedad show indica si el menú debe mostrarse o no
  public show?: boolean;
}
