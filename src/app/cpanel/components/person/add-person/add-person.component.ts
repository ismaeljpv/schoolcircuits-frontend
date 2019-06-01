import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GetDataService } from '../../../services/get-data.service';
import { PostDataService } from '../../../services/post-data.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})
export class AddPersonComponent implements OnInit {

  addPersonForm: FormGroup;
  planteles: Array<any> = [];
  temporalData: any;
  blobimg: any;
  previewimg: any;
  image: HTMLImageElement;
  today: any;

  constructor(private formBuilder: FormBuilder, private getData: GetDataService, private postPerson: PostDataService) {
    this.addPersonForm = formBuilder.group({
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
    }, {
      validator: [this.checkDate('fingreso'), this.checkBirthdate('fnacimiento')]
    });
   }

  ngOnInit() {

    this.today = this.hoyFecha();
    console.log(this.today);

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
          this.previewimg = document.getElementById('preview');
          this.image = document.createElement('img');
          this.image.src =  '';
          this.image.style.height = 190+"px";
          this.previewimg.innerHTML = '';
          this.previewimg.append(this.image);
        
      },
      error =>{
        console.log(error);
      }
    );

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

  

  toblob(readerEvent){
    let binaryString = readerEvent.target.result;
    this.blobimg = "data:image/jpeg;base64," + btoa(binaryString);
    this.image.src = this.blobimg;
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

  postData(form: FormGroup){
   
    console.log(form);
    // Ejemplo 
    let _jsn = {
      
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
      'foto':this.blobimg
    }
    console.log(_jsn);

    this.postPerson.postPerson(_jsn).subscribe(
      response =>{
        swal.fire({
          type: 'success',
          title: 'Se ha guardado correctamente!',
        })
        this.addPersonForm.reset();
        this.image.src ="";
      },
      error=>{
        swal.fire({
          type: 'error',
          title: 'Ha ocurrido un error!',
        })
      }
    );
    
}
}
