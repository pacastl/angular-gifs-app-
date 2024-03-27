import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'gifs-search-box',
  template: `
  <h5>Buscar:</h5>
  <input type="text"
  class="form-control"
  placeholder="Buscar gifs..."
  (keyup.enter)="searchTag()"
  #txtTagInput
  >
  `
})

export class SearchBoxComponent{

  @ViewChild(`txtTagInput`)
  public tagInput!: ElementRef<HTMLInputElement>;
  // Cambiardo **
  public error: string='';

  // Inyectamos el servicio
  constructor(private gifsService:GifsService,private snackBar: MatSnackBar) { }

  searchTag(){

    const newTag=this.tagInput.nativeElement.value

    this.gifsService.searchTag(newTag, 0);
    // this.gifsService.searchTag(newTag);
    this.tagInput.nativeElement.value='';

    setTimeout(() => {
      this.error = this.gifsService.error;
      if (this.error) {
        this.alert(this.error)
      }
    }, 200);
  }

  alert(error: string) {
    this.snackBar.open(error, 'Close', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['mat-toolbar', 'mat-warn']
    });
  }

}
