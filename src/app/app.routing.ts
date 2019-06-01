import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { HomeModule } from './home/home.module';
// import { CpanelModule } from './cpanel/cpanel.module';
import { RoleGuard } from './_guards/role.guard';

const routes: Routes = [
    {path: '', loadChildren:'./home/home.module#HomeModule'},
    {path:'dashboard', loadChildren:'./cpanel/cpanel.module#CpanelModule', canActivate:[RoleGuard]}
]


@NgModule({
    imports:[ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ],
    declarations: []
})
export class AppRoutingModule { }
