import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../../../services/get-data.service';


@Component({
  selector: 'show-person',
  templateUrl: './show-person.component.html',
  styleUrls: ['./show-person.component.css']
})
export class ShowPersonComponent implements OnInit {

  person ={
        "idpersona": '',
        "cedula": '',
        "apellido1": '',
        "nombre1": '',
        "correoPersona": '',
        "cargoFuncion":'',
        "plantel":'',
        "estatus":''
        
  };
  idperson: any;
  previewimg: any;
  image: HTMLImageElement;
  
  constructor(private getData: GetDataService) { }

  ngOnInit() {
    this.getData.getPersonId().subscribe( response =>{
      console.log(response.text);
      this.idperson = response.text;
      this.showModal(this.idperson);
     });
  }

  hideModal(){
    document.getElementById('_modal').style.display = "none";
  }

  showModal(id:any){
   
    this.getData.getFullPerson(id).subscribe(
      response =>{
          console.log(response);
        this.person['idpersona'] = response.Person.idpersona;
        this.person['nombre1'] = response.Person.nombre1 +" "+ response.Person.nombre2;
        this.person['apellido1'] = response.Person.apellido1 +" "+ response.Person.apellido2;
        this.person['cedula'] = response.Person.cedula;
        this.person['correoPersona'] = response.Person.correoPersona;
        this.person['cargoFuncion'] = response.Person.cargoFuncion;
        this.person['estatus'] = response.Person.estatus;
              if(response.School !== null){
          this.person['plantel'] = response.School.plantel;
        }else{
          this.person['plantel'] = 'SIN ASIGNAR';
        }
        this.previewimg = document.getElementById('preview');
        this.image = document.createElement('img');
        this.image.src =  response.Person.foto;
        this.image.style.height = 190+"px";
        this.previewimg.innerHTML = '';
        this.previewimg.append(this.image);
      },
      error =>{
        console.log(error);
      }
    );
    document.getElementById('_modal').style.display = "block";
  }

  
}
