import { Component, Input } from '@angular/core';
import { Pagination } from '../../../gifs/interfaces/gifs.interfaces';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-pagination',
  templateUrl: './pagination.component.html',
  // styleUrl: './pagination.component.css'
})
export class PaginationComponent {

  public currentPage: any = 1

  public offset: any

  constructor(private gifsService: GifsService) {}

  @Input()
  public pagination!: Pagination;

  get tag(): string {
    let firstTag = this.gifsService.tagsHistory[0]
    return firstTag
  }

  get pageCount() {
    const limit = this.gifsService.limit
    const totalCount = this.gifsService.pagination.total_count;
    let totalPages;
    if (totalCount > 4999) {
      totalPages = 417
    } else {
      totalPages = Math.ceil(totalCount / limit);
    }

    return totalPages;
  }

  // get pages(): (string | number)[] {
  //   if (this.gifsService.pagination.offset == 0 && this.gifsService.response) {
  //     this.currentPage = 1
  //   }

  //   const visiblePage = 1;
  //   let arrayPages: (string | number)[] = []

  //   if (this.pagination) {
  //     let numPages = this.pageCount
  //     let startPage = Math.max(1, this.currentPage - visiblePage)
  //     let endPage = Math.min(numPages, this.currentPage + visiblePage)

  //     if (startPage > 1) {
  //       arrayPages.push(1)
  //       if (startPage > 2) {
  //         arrayPages.push('...')
  //       }
  //     }

  //     for (let i = startPage; i <= endPage; i++) {
  //       arrayPages.push(i)
  //     }

  //     if (endPage < numPages) {
  //       if (endPage < numPages - 1) {
  //         arrayPages.push('...')
  //       }
  //       arrayPages.push(numPages)
  //     }
  //   }
  //   return arrayPages
  // }
  get pages(): (string | number)[] {
    if (this.gifsService.pagination.offset === 0 && this.gifsService.response) {
      this.currentPage = 1;
    }

    const visiblePage = 1;
    let arrayPages: (string | number)[] = [];

    if (this.pagination) {
      let numPages = this.pageCount;
      let startPage = Math.max(1, this.currentPage - visiblePage);
      let endPage = Math.min(numPages, this.currentPage + visiblePage);

      if (startPage > 1) {
        arrayPages.push(1);
        if (startPage > 2) {
          arrayPages.push('...');
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        arrayPages.push(i);
      }

      if (endPage < numPages) {
        if (endPage < numPages - 1) {
          arrayPages.push('...');
        }
        arrayPages.push(numPages);
      }
    }

    return arrayPages;
  }
  // goToPage(page: any): void {
  //   this.currentPage = page
  //   this.gifsService.searchTag(this.tag, page - 1)
  // }

  goToPage(page: any): void {
    this.currentPage = page;
    this.gifsService.searchTag(this.tag, page - 1);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.gifsService.searchTag(this.tag, this.currentPage - 1)
    }
  }

  nextPage() {
    if (this.currentPage < this.pageCount) {
      this.currentPage++;
      this.gifsService.searchTag(this.tag, this.currentPage - 1)
    }
  }

  firstPage() {
    this.currentPage = 1
    this.gifsService.searchTag(this.tag, this.currentPage - 1)
  }

  lastPage() {
    this.currentPage = this.pageCount;
    this.gifsService.searchTag(this.tag, this.currentPage - 1)
  }
}

