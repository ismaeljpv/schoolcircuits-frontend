import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import * as $ from 'jquery';
import { Roles } from '../_models/roles';
@Component({
  selector: 'app-cpanel',
  templateUrl: './cpanel.component.html',
  styleUrls: ['./cpanel.component.css']
})
export class CpanelComponent implements OnInit {

  user : any;
  constructor( private service: AuthenticationService ) { }

  ngOnInit() {

    $(document).ready(function () {
    
      $('#sidebarCollapse').on('click', function () {
          $('#sidebar, #content').toggleClass('active');
          $('.collapse.in').toggleClass('in');
          $('a[aria-expanded=true]').attr('aria-expanded', 'false');
      });
   
      });
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
