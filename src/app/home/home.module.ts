import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { HomeComponent } from './home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { BoardPageComponent } from './components/board-page/board-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { HomeRoutingModule } from './home.routing';
import { ContactFormComponent } from './components/home-page/contact-form/contact-form.component';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  imports: [
    CommonModule,
    ScrollToModule.forRoot(),
    HomeRoutingModule,
    DataTablesModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    HomeComponent,
    NavbarComponent, 
    FooterComponent, 
    HomePageComponent, 
    BoardPageComponent, 
    LoginPageComponent, 
    ContactFormComponent, LoadingComponent
  ],
  exports: [
    HomeComponent,
  ]
})
export class HomeModule { }
