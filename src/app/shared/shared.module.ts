import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LazyImageComponent } from './components/lazy-image/lazy-image.component';
import { PaginationComponent } from './components/pagination/pagination.component';



@NgModule({
  declarations: [
    SidebarComponent,
    LazyImageComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SidebarComponent,
    LazyImageComponent,
    PaginationComponent
  ]
})
export class SharedModule { }
