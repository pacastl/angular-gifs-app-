import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({ providedIn: 'root' })
export class GifsService {

  public gifList: Gif[] = [];
  private _tagsHistory: string[] = [];
  private apiKey: string = 'i1Dg0foQU2DPVEB9E42FyoCqu9BpAS1g';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs'

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
    console.log('Gifs Service Ready');

  }

  get tagsHistory() {
    // Los array en javascript se pasan por referencia
    //     return this._tagsHistory;

    // De esta forma, pasamos una copia
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string) {
    // Pasasmos a minúscula para facilitar la búsqueda
    tag = tag.toLowerCase();

    if (this._tagsHistory.includes(tag)) {
      //Como queremos añadir un tag, filtramos los que sean igal al introducido
      // y conservamos los que no sean igual para evitar repetidos
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag)
    }
    // Lo añadimos al principio
    this._tagsHistory.unshift(tag);
    // Vamos a tener 10 elementos máx
    this._tagsHistory = this.tagsHistory.slice(0, 10);

    this.saveLocalStorage();

  }
  searchTag(tag: string): void {

    // Si el usuario no ha introducido nada,no hace nada
    if (tag.length === 0) return;
    this.organizeHistory(tag);
    // Añade al inicio
    // this._tagsHistory.unshift(tag)

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', 10)
      .set('q', tag)

    // Petición http
    // Es un observable
    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe((resp) => {
        this.gifList = resp.data;
        // console.log({gifs: this.gifList});

      });

  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage():void {
    if( !localStorage.getItem('history')) return;

    this._tagsHistory = JSON.parse( localStorage.getItem('history')! );

    if ( this._tagsHistory.length === 0 ) return;
    this.searchTag( this._tagsHistory[0] );
  }

}
