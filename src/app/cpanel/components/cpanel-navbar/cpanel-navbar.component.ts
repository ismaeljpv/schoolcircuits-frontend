import { Component, OnInit } from '@angular/core';
import  { AuthenticationService }  from '../../../_services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cpanel-navbar',
  templateUrl: './cpanel-navbar.component.html',
  styleUrls: ['./cpanel-navbar.component.css']
})
export class CpanelNavbarComponent implements OnInit {
  user: any;
  iduser: any;
  constructor( private service: AuthenticationService, private route: Router) { }

  ngOnInit() {
    this.user = this.service.perfil();
    this.iduser = this.user.iduser;
    console.log(this.user);
   
  }

  signOut(){
    this.service.singOut();
    this.route.navigate(['/']);
  }

  hideSide(){
    var side = document.getElementById('sidebar');
    side.style.display = "none";
    side.style.marginLeft = 0+"px";
    side.style.zIndex = '100';
    var buttonHide = document.getElementById('hide').style.display="none";
    var buttonShow = document.getElementById('show').style.display = "block";
  }

  // Funcion para mostrar la sidebar
  showSide(){
    var side = document.getElementById('sidebar');
    side.style.display = "block";
    side.style.marginLeft = 0+"px";
    var buttonHide = document.getElementById('hide').style.display="block";
    var buttonShow = document.getElementById('show').style.display = "none";
  }


}
