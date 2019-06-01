import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GetDataService } from '../../../services/get-data.service'; 
import { PostDataService } from '../../../services/post-data.service'; 
import swal from 'sweetalert2';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  addUserForm: FormGroup;
  temporalData : any;
  supervisores : Array<any> = [];
  type1:string = "password";
  type2:string = "password";

  constructor(private formBuilder: FormBuilder, private getData: GetDataService, private postUser: PostDataService) { 
    this.addUserForm = formBuilder.group({
      usuario: ['', Validators.required],
      correo: ['', Validators.required],
      clave: ['', Validators.required],
      perfil: ['', Validators.required],
      confirmarClave: ['', Validators.required],
      idPersona: ['', Validators.required]
    }, {validator: this.checkIfMatchingPasswords('clave', 'confirmarClave')});
  }

  ngOnInit() {
      this.getData.getPersons().subscribe(
      response => {
        this.temporalData = response.body;
        for( let i of this.temporalData){
              let json = {
                'idPersona': i.idpersona,
                'nombre': i.nombre1 + ' ' + i.apellido1 +' / CI:'+ i.cedula
              }
              this.supervisores.push(json);
        }
        console.log(this.supervisores);
      },
      error => {
       console.log(error);
      }
    );
    
  }

  showPsw() {
    if(this.type1 === "password") {
      this.type1 = "text";
    }
    else {
      this.type1 = "password";
    }
  }

  showPsw1() {
    if(this.type2 === "password") {
      this.type2 = "text";
    }
    else {
      this.type2 = "password";
    }
  }
  

  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey],
          passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notEquivalent: true})
      }
      else {
          return passwordConfirmationInput.setErrors(null);
      }
    }
  }

  postData(form: FormGroup){
    //let persona = this.service.decodeToken();
    console.log(form);
    // Ejemplo 
    let _jsn = {
      
      'nombreusuario': form.controls['usuario'].value,
      'correo': form.controls['correo'].value,
      'clave': form.controls['clave'].value,
      'perfil': form.controls['perfil'].value,
      'idpersona': parseInt(form.controls['idPersona'].value)
    }
    
    this.postUser.postUser(_jsn).subscribe(
      response => {
        swal.fire({
          type: 'success',
          title: 'Se ha guardado correctamente!',
        })
        this.addUserForm.reset();
      },
      error => {
        swal.fire({
          type: 'error',
          title: 'Ha ocurrido un error!',
        })
      }
    );

}


}
