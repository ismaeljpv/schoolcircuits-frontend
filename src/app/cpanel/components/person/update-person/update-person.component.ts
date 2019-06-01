import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GetDataService } from '../../../services/get-data.service';
import { PutDataService } from '../../../services/put-data.service';
import swal from 'sweetalert2';
import { from } from 'rxjs';

@Component({
  selector: 'app-update-person',
  templateUrl: './update-person.component.html',
  styleUrls: ['./update-person.component.css']
})
export class UpdatePersonComponent implements OnInit {
  
  id:any;
  person:any;
  updatePersonForm: FormGroup;
  planteles: Array<any> = [];
  temporalData: any;
  blobimg: any;
  previewimg: any;
  image: HTMLImageElement;

  
  constructor(public route: ActivatedRoute, private formBuilder: FormBuilder, private getData: GetDataService, private putPerson: PutDataService) { 
    this.updatePersonForm = formBuilder.group({
      cedula: ['', Validators.required],
      nombre1: ['', Validators.required],
      nombre2: ['', Validators.required],
      apellido1: ['', Validators.required],
      apellido2:['', Validators.required],
      nacionalidad: ['', Validators.required],
      sexo:['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', Validators.required],
      fnacimiento: ['', Validators.required],
      fingreso: ['', Validators.required],
      nivelacadem: ['', Validators.required],
      cargoNominal: ['', Validators.required],
      cargoFuncion: ['', Validators.required],
      estatus: ['', Validators.required],
      supervisor: ['', Validators.required],
      observaciones: ['', Validators.required],
      digitoscuenta: ['', Validators.required],
      carnetserial: ['', Validators.required],
      carnetcodigo: ['', Validators.required],
      plantel: ['',Validators.required],
      foto: ['', Validators.required]
    }, 
    {
      validator: [this.checkDate('fingreso'), this.checkBirthdate('fnacimiento')]
    }
    );
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
    });

    this.getData.getSchoolsInfo().subscribe(
      response =>{
       
        this.temporalData = response;
        for( let i of this.temporalData){
          let json = {
            'idplantel': i.idplantel,
            'plantel': i.plantel
          }
          this.planteles.push(json);
          }
          console.log(this.planteles);
         
      },
      error =>{
        console.log(error);
      }
    );
    
    this.getData.getFullPerson(this.id).subscribe(
      response =>{
        this.person = response;
        this.updatePersonForm.get("nombre1").setValue(this.person.Person.nombre1);
        this.updatePersonForm.get("nombre2").setValue(this.person.Person.nombre2);
        this.updatePersonForm.get("apellido1").setValue(this.person.Person.apellido1);
        this.updatePersonForm.get("apellido2").setValue(this.person.Person.apellido2);
        this.updatePersonForm.get("cedula").setValue(this.person.Person.cedula);
        this.updatePersonForm.get("nacionalidad").setValue(this.person.Person.nacionalidad);
        this.updatePersonForm.get("sexo").setValue(this.person.Person.sexo);
        this.updatePersonForm.get("direccion").setValue(this.person.Person.direccion);
        this.updatePersonForm.get("correo").setValue(this.person.Person.correoPersona);
        this.updatePersonForm.get("telefono").setValue(this.person.Person.telefono);
        this.updatePersonForm.get("supervisor").setValue(this.person.Person.supervisor);
        this.updatePersonForm.get("fingreso").setValue(this.FormatDate(this.person.Person.fIngreso));
        this.updatePersonForm.get("cargoFuncion").setValue(this.person.Person.cargoFuncion);
        this.updatePersonForm.get("estatus").setValue(this.person.Person.estatus);
        this.updatePersonForm.get("digitoscuenta").setValue(this.person.Person.digitosCuenta);
        this.updatePersonForm.get("carnetserial").setValue(this.person.Person.carnetpSerial);
        this.updatePersonForm.get("carnetcodigo").setValue(this.person.Person.carnetpCodigo);
        this.updatePersonForm.get("observaciones").setValue(this.person.Person.observaciones);
        this.updatePersonForm.get("nivelacadem").setValue(this.person.Person.nivelAcadem);
        this.updatePersonForm.get("fnacimiento").setValue(this.FormatDate(this.person.Person.fNacimiento));
        this.updatePersonForm.get("cargoNominal").setValue(this.person.Person.cargoNominal);
        this.updatePersonForm.get("plantel").setValue(this.person.Person.idplantel);
        
        // Vista previa de la imagen
        let src;
        if(this.person.Person.foto !== null){
          src = this.person.Person.foto;
        }else{
          src = '';
        }
        this.previewimg = document.getElementById('preview');
        this.image = document.createElement('img');
        this.image.src =  src;
        this.image.style.height = 190+"px";
        this.previewimg.innerHTML = '';
        this.previewimg.append(this.image);
       
      },
      error=>{
        console.log(error);
      }
    );
   
   
  }

  getimg(event){
    if(event.target.value === ""){
      this.blobimg = '';
    }else{
    console.log(event.target.files);
    let file = event.target.files;
    var reader = new FileReader();
    reader.onload = this.toblob.bind(this);
    reader.readAsBinaryString(file[0]);
    }
  
  }

  addZero(i) {
    if (i < 10) {
        i = '0' + i;
    }
    return i;
}

  hoyFecha(){
    let hoy = new Date();
        let dd = hoy.getDate();
        let mm = hoy.getMonth();
        let yyyy = hoy.getFullYear();
        
        dd = this.addZero(dd);
        mm = this.addZero(mm);
        //console.log(`${yyyy}-${dd}-${mm}`);
 
        return new Date(yyyy,dd,mm);
  }

  checkDate(DateKey: string) {
    return (group: FormGroup) => {
      let dateInput = group.controls[DateKey];
      let datein = dateInput.value;
      
      let dateout = new Date(datein);
      let dd = dateout.getDate();
      let mm = dateout.getMonth()+1;
      let yyyy = dateout.getFullYear();

      let dateGood = new Date(yyyy,dd,mm);

        if (dateGood.getTime() > this.hoyFecha().getTime()) {
          return dateInput.setErrors({notEquivalent: true})
        }
        else {
            return dateInput.setErrors(null);
        }
      
    }
  }

  checkBirthdate(DateKey: string) {
    return (group: FormGroup) => {
      let dateInput = group.controls[DateKey];
      let datein = dateInput.value;
      
      let dateout = new Date(datein);
      let dd = dateout.getDate();
      let mm = dateout.getMonth()+1;
      let yyyy = dateout.getFullYear();

      let dateGood = new Date(yyyy,dd,mm);
      let dateBirth = new Date(2002,1,1);
        if (dateGood.getFullYear() > dateBirth.getFullYear()) {
          return dateInput.setErrors({notEquivalent: true})
        }
        else {
            return dateInput.setErrors(null);
        }
      
    }
  }


  alphaOnly(event) {
    let key = event.keyCode;
    return ((key >= 65 && key <= 90) || key == 8  || (key > 96 && key < 123));
  };

  onlyNumbers(event) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57 ;
  }

  validatePhoneNumber(event) {
    return (event.charCode == 8 || event.charCode == 0 || event.charCode == 32) ? null : event.charCode >= 48 && event.charCode <= 57 ;
  }

  toblob(readerEvent){
    let binaryString = readerEvent.target.result;
    this.blobimg = "data:image/jpeg;base64," + btoa(binaryString);
    this.image.src = this.blobimg;
  }

  FormatDate(iDate: Date) {
    let inputDate = new Date(iDate);
    let year = inputDate.getFullYear().toString();
    let month = ((inputDate.getMonth() + 1) < 10) ?  '0'+(inputDate.getMonth() + 1).toString() : (inputDate.getMonth() + 1).toString();
    let day = (inputDate.getDate()  < 10) ?  '0'+inputDate.getDate().toString()  : inputDate.getDate().toString();
    var formattedDate = year +'-'+ month +'-'+ day;
    return formattedDate;
 }

  postData(form: FormGroup){
    //let persona = this.service.decodeToken();
    console.log(form);
    // Ejemplo 
    let _jsn = {
      'idpersona': this.person.Person.idpersona,
      'cedula': form.controls['cedula'].value,
      'nombre1': form.controls['nombre1'].value,
      'nombre2': form.controls['nombre2'].value,
      'apellido1': form.controls['apellido1'].value,
      'apellido2': form.controls['apellido2'].value,
      'nacionalidad': form.controls['nacionalidad'].value,
      'sexo': form.controls['sexo'].value,
      'direccion': form.controls['direccion'].value,
      'telefono': form.controls['telefono'].value,
      'correoPersona': form.controls['correo'].value,
      'fNacimiento': form.controls['fnacimiento'].value,
      'fIngreso': form.controls['fingreso'].value,
      'nivelAcadem': form.controls['nivelacadem'].value,
      'cargoNominal': form.controls['cargoNominal'].value,
      'cargoFuncion': form.controls['cargoFuncion'].value,
      'estatus': form.controls['estatus'].value,
      'supervisor': form.controls['supervisor'].value,
      'observaciones': form.controls['observaciones'].value,
      'digitosCuenta': form.controls['digitoscuenta'].value,
      'carnetpSerial': form.controls['carnetserial'].value,
      'carnetpCodigo': form.controls['carnetcodigo'].value,
      'idplantel': parseInt(form.controls['plantel'].value),
      'idcircuito': (this.person.Person.idcircuito !== null ) ? parseInt(this.person.Person.idcircuito) : null,
      'foto':this.blobimg
    }
    console.log(_jsn);
    
    this.putPerson.putPerson(this.id, _jsn).subscribe(
      response =>{
        swal.fire({
          type: 'success',
          title: 'Se ha guardado correctamente!',
        })
        this.updatePersonForm.reset();
        this.image.src ="";
      }, error =>{
        swal.fire({
          type: 'error',
          title: 'Ha ocurrido un error!',
        })
      }
    );
}

}
