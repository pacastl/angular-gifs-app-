import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, Pagination, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({ providedIn: 'root' })
// export class GifsService {

//   public gifList: Gif[] = [];
//   private _tagsHistory: string[] = [];
//   private apiKey: string = 'i1Dg0foQU2DPVEB9E42FyoCqu9BpAS1g';
//   private serviceUrl: string = 'https://api.giphy.com/v1/gifs'

//   public pagination!: Pagination;
//   // Cambiados **
//   public response: boolean=false
//   public error: string=''

//   constructor(private http: HttpClient) {
//     this.loadLocalStorage();
//     console.log('Gifs Service Ready');

//   }

//   get tagsHistory() {
//     // Los array en javascript se pasan por referencia
//     //     return this._tagsHistory;

//     // De esta forma, pasamos una copia
//     return [...this._tagsHistory];
//   }

//   private organizeHistory(tag: string) {
//     // Pasasmos a minúscula para facilitar la búsqueda
//     tag = tag.toLowerCase();

//     if (this._tagsHistory.includes(tag)) {
//       //Como queremos añadir un tag, filtramos los que sean igal al introducido
//       // y conservamos los que no sean igual para evitar repetidos
//       this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag)
//     }
//     // Lo añadimos al principio
//     this._tagsHistory.unshift(tag);
//     // Vamos a tener 10 elementos máx
//     this._tagsHistory = this.tagsHistory.slice(0, 10);

//     this.saveLocalStorage();

//   }
//   // TODO: tratar de que page no sea de tipo any
//   searchTag(tag: string,page:any): void {

//     // Si el usuario no ha introducido nada,no hace nada
//     if (tag.length === 0) {
//       this.error='Por falor, introduzca un término de búsqueda';
//       return;
//     }
//     page = page * this.limit;

//     // this.organizeHistory(tag);

//     // Añade al inicio
//     // this._tagsHistory.unshift(tag)

//     // const params = new HttpParams()
//     //   .set('api_key', this.apiKey)
//     //   .set('limit', 10)
//     //   .set('q', tag)

//     const params = new HttpParams()
//     .set('api_key', this.apiKey)
//     .set('limit', this.limit.toString())
//     .set('q', tag)
//     .set('offset', page.toString());

//     // Petición http
//     // Es un observable
//     // this.http.get<SearchResponse>(`${this.serviceUrl}/search`, { params })
//     //   .subscribe((resp) => {
//     //     this.gifList = resp.data;
//     //     // console.log({gifs: this.gifList});

//     //   });
//      // Petición http
//     this.http.get<SearchResponse>(`${ this.serviceUrl }/search`, { params })
//     .subscribe( response => {
//       let responseLength = response.data.length;
//       this.response = true;

//       // If no GIFs are found, set an error message
//       if (!responseLength) {
//         this.error = 'No se han encontrado resultados';
//       } else {
//         // If GIFs are found, update the gifList, pagination, and tags history
//         this.gifList = response.data;
//         this.pagination = response.pagination;
//         this.organizeHistory(tag);
//       }
//     });

//   }

//   private saveLocalStorage(): void {
//     localStorage.setItem('history', JSON.stringify(this._tagsHistory));
//   }

//   private loadLocalStorage():void {
//     if( !localStorage.getItem('history')) return;

//     this._tagsHistory = JSON.parse( localStorage.getItem('history')! );

//     if ( this._tagsHistory.length === 0 ) return;
//     // this.searchTag( this._tagsHistory[0] );
//     this.searchTag( this._tagsHistory[0],0 );

//   }
//   get limit(): number {
//     // 12 es el nº de gifs deplegados por página
//     const limit = 12;
//     return limit;
//   }

//   deleteTag(tag: string): void {
//     const position = this._tagsHistory.findIndex(object => object == tag);

//     // Remove the tag from the history
//     if (this._tagsHistory.includes(tag)) {
//       this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag !== tag);
//     }

//     // Save the updated tags history to local storage
//     localStorage.setItem('history', JSON.stringify(this._tagsHistory));

//     // If there are no more tags in the history, clear the gifList
//     if (!this._tagsHistory.length) {
//       this.gifList = [];
//     } else if (position == 0) {
//       // If the deleted tag was the first in the history, perform a search with the new first tag
//       this.searchTag(this._tagsHistory[0], 0);
//     }
//   }

//   // Method to delete the entire tags history
//   deleteList(): void {
//     this._tagsHistory = [];
//     this.gifList = [];

//     // Clear the tags history in local storage
//     localStorage.setItem('history', JSON.stringify(this._tagsHistory));
//   }

// }
export class GifsService {

  // Public properties
  public gifList: Gif[] = [];
  private _tagsHistory: string[] = [];
  public pagination!: Pagination;
  // Cambiados **
   public response: boolean=false
   public error: string=''
  // public response!: boolean;
  // public error!: string;

  private apiKey: string = 'i1Dg0foQU2DPVEB9E42FyoCqu9BpAS1g';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';


  constructor( private http: HttpClient ) {
    this.loadLocalStorage();
  }

  get tagsHistory() {
    // Los array en javascript se pasan por referencia
    //     return this._tagsHistory;

    // De esta forma, pasamos una copia
    return [...this._tagsHistory];
  }

  // Private method to organize tags history
  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();

    // Remove existing tag from history
    if (this._tagsHistory.includes(tag)) {
      //Como queremos añadir un tag, filtramos los que sean igal al introducido
      // y conservamos los que no sean igual para evitar repetidos
      this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag !== tag);
    }

    // Add new tag to the beginning of the history
    this._tagsHistory.unshift(tag);

    // Limit the history to the last 10 tags
    this._tagsHistory = this._tagsHistory.slice(0, 10);

    // Save the updated tags history to local storage
    this.saveLocalStorage();
  }

  // TODO: tratar de que page no sea de tipo any
  searchTag(tag: string, page: any): void {
    this.error = '';

    // Si el usuario no ha introducido nada,no hace nada
    if (tag.length === 0) {
      this.error = 'Por favor, introduce un término de búsqueda';
      return;
    }

    page = page * this.limit;

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', this.limit.toString())
      .set('q', tag)
      .set('offset', page.toString());

    this.response = false;

    // Petición http
    // Es un observable
    this.http.get<SearchResponse>(`${ this.serviceUrl }/search`, { params })
      .subscribe( response => {
        let responseLength = response.data.length;
        this.response = true;

        if (!responseLength) {
          this.error = 'No se han encontrado resultados';
        } else {
          this.gifList = response.data;
          this.pagination = response.pagination;
          this.organizeHistory(tag);
        }
      });
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify( this._tagsHistory ));
  }

  private loadLocalStorage():void {
    if (!localStorage.getItem('history')) return;
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);

    // If there are tags in the history, perform a search with the first tag
    if (this._tagsHistory.length === 0) return;
      // this.searchTag( this._tagsHistory[0] );
    this.searchTag(this._tagsHistory[0], 0);
  }

  // Method to delete the entire tags history
  deleteList(): void {
    this._tagsHistory = [];
    this.gifList = [];

    // Clear the tags history in local storage
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  deleteTag(tag: string): void {
    const position = this._tagsHistory.findIndex(object => object == tag);

    // Remove the tag from the history
    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag !== tag);
    }

    // Save the updated tags history to local storage
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));

    // If there are no more tags in the history, clear the gifList
    if (!this._tagsHistory.length) {
      this.gifList = [];
    } else if (position == 0) {
      // If the deleted tag was the first in the history, perform a search with the new first tag
      this.searchTag(this._tagsHistory[0], 0);
    }
  }

  get limit(): number {
    // 12 es el nº de gifs deplegados por página
    const limit = 12;
    return limit;
  }

}
