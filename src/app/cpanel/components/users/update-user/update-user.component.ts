import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GetDataService } from '../../../services/get-data.service'; 
import { PutDataService } from '../../../services/put-data.service'; 
import swal from 'sweetalert2';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  id: any;
  user: any;
  updateUserForm: FormGroup;
  temporalData: any;
  supervisores : Array<any> = [];
  type1:string = "password";
  type2:string = "password";


  constructor(public route: ActivatedRoute, private formBuilder: FormBuilder, private getData: GetDataService, private putData: PutDataService) { 

    this.updateUserForm = formBuilder.group({
      usuario: ['', Validators.required],
      correo: ['', Validators.required],
      clave: ['', Validators.required],
      perfil: ['', Validators.required],
      confirmarClave: ['', Validators.required],
      idPersona: ['', Validators.required]
    }, {validator: this.checkIfMatchingPasswords('clave', 'confirmarClave')}  );

  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

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

    this.getData.getOnlyUser(this.id).subscribe(
      response => {
        this.user = response.body;
        this.updateUserForm.get('usuario').setValue(this.user.nombreusuario);
        this.updateUserForm.get('clave').setValue(this.user.clave);
        this.updateUserForm.get('confirmarClave').setValue(this.user.clave);
        this.updateUserForm.get('correo').setValue(this.user.correo);
        this.updateUserForm.get('perfil').setValue(this.user.perfil);
        this.updateUserForm.get('idPersona').setValue(this.user.idpersona);
        console.log(this.user);
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
    console.log(typeof form.controls['idPersona'].value);
    // Ejemplo 
    let _jsn = {
      'idusuario': this.user.idusuario,
      'nombreusuario': form.controls['usuario'].value,
      'correo': form.controls['correo'].value,
      'clave': form.controls['clave'].value,
      'perfil': form.controls['perfil'].value,
      'idpersona': form.controls['idPersona'].value
    }
    console.log(_jsn);
    console.log(this.id);
    this.putData.putUser(this.id, _jsn).subscribe(
      response => {
        swal.fire({
          type: 'success',
          title: 'Se ha guardado correctamente!',
        })
        this.updateUserForm.reset();
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
