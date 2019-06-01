import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../_services/authentication.service';
import { Roles } from '../../../_models/roles';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  user : any;
  constructor(private service: AuthenticationService) { }

  ngOnInit() {
    this.user = this.service.perfil();
  }

  get isSupervisor(){
    return this.user && this.user.perfil === Roles.SUPERVISOR;
  }

  get isAdmin(){
    return this.user && this.user.perfil === Roles.ADMINISTRADOR;
  }

  get isDirector(){
    return this.user && this.user.perfil === Roles.DIRECTOR;
  }

}
