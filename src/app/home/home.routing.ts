import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { BoardPageComponent } from './components/board-page/board-page.component';
import { LoadingComponent } from './components/loading/loading.component';

const rutas: any = [
    {path: "", component:HomePageComponent},
    {path:"login", component: LoginPageComponent},
    {path:"board", component: BoardPageComponent},
    {path: "load", component: LoadingComponent}
]

const routes: Routes = [
    {path: '', component: HomeComponent, children: rutas }
]


@NgModule({
    imports:[ RouterModule.forChild(routes) ],
    exports: [ RouterModule ],
    declarations: []
})
export class HomeRoutingModule { }