import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetDataService } from '../../../services/get-data.service'; 
import { user } from './user';

@Component({
  selector: 'show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.css']
})
export class ShowUserComponent implements OnInit {
  user = {
    "nombreusuario": '',
    "correo": '',
    "cedula": '',
    "nombre1": '',
    "apellido1": '',
    "perfil": ''
  };
  idUser : any;
  show:boolean=false;

  constructor(private getData: GetDataService) {
    
   }

  ngOnInit() {
   this.getData.getUserId().subscribe( response =>{
     this.idUser = response.text;
     console.log(this.idUser);
     this.showModal(this.idUser);
    });
  
  }

  hideModal(){
    document.getElementById('_modal').style.display = "none";
  }

  showModal( id:any ){
    
   
    this.getData.getUser(id).subscribe(
      response => {
        console.log(response.body['User'].nombreusuario);
        this.user = {
            "nombreusuario": response.body['User'].nombreusuario,
            "correo": response.body['User'].correo,
            "cedula": response.body['Person'].cedula,
            "nombre1": response.body['Person'].nombre1,
            "apellido1": response.body['Person'].apellido1,
            "perfil": response.body['User'].perfil
        }
        console.log(this.user);
      },
      error => {
       console.log(error);
      }
    );
    document.getElementById('_modal').style.display = "block";
  }

}
