import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { GetDataService } from '../../../services/get-data.service'; 
import { PostDataService } from '../../../services/post-data.service'; 
import { from } from 'rxjs';
import swal from 'sweetalert2';

@Component({
  selector: 'app-add-circuit',
  templateUrl: './add-circuit.component.html',
  styleUrls: ['./add-circuit.component.css']
})
export class AddCircuitComponent implements OnInit {

  addCircuitForm: FormGroup;
  schools : Array<any> = [];
  blobimg: any;
  temporalData: any;
  supervisores : Array<any> = [];
  previewimg: any;
  image: HTMLImageElement;
  
  constructor(private formBuilder: FormBuilder, private getData: GetDataService, private postCircuit: PostDataService) {
    this.addCircuitForm = formBuilder.group({
      nro: ['', Validators.required],
      nombrecircuital: ['', Validators.required],
      codigo: [ '', Validators.required],
      lema: ['', Validators.required],
      puntoycirculo:['', Validators.required],
      supervisor: ['', Validators.required],
      imagengeoref:['', Validators.required],
      estado: ['', Validators.required],
      municipio: ['', Validators.required],
      parroquia: ['', Validators.required],
      nroplanteles: ['', Validators.required]
    });
   }

  ngOnInit() {

    this.getData.getSchoolsInfo().subscribe(
      response => {
        this.schools = response;
      },
      error => {
       console.log(error);
      }
    );

    this.getData.getSupervisores().subscribe(
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

        this.previewimg = document.getElementById('preview');
        this.image = document.createElement('img');
        this.image.src =  '';
        this.image.style.height = 190+"px";
        this.previewimg.innerHTML = '';
        this.previewimg.append(this.image);

  }

  onlyNumbers(event) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
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
    this.image.src =  this.blobimg;
  }

  postData(form: FormGroup){
    //let persona = this.service.decodeToken();
    console.log(form);
    // Ejemplo 
    let _jsn = {
  
      'nro': form.controls['nro'].value,
      'nombrecircuital': form.controls['nombrecircuital'].value,
      'codigoCircuital': form.controls['codigo'].value,
      'lema': form.controls['lema'].value,
      'puntoycirculo': form.controls['puntoycirculo'].value,
      'imagenGeoref':  this.blobimg,
      'estado': form.controls['estado'].value,
      'municipio': form.controls['municipio'].value,
      'parroquia': form.controls['parroquia'].value,
      'nroplanteles': form.controls['nroplanteles'].value,
      'idpersona': parseInt(form.controls['supervisor'].value)
     
    }

    console.log(_jsn);
    
    this.postCircuit.postCircuit(_jsn).subscribe(
      response => {
        swal.fire({
          type: 'success',
          title: 'Se ha Registrado correctamente!',
        });
        this.addCircuitForm.reset();
        this.image.src="";
      },
      error =>{
        swal.fire({
          type: 'error',
          title: 'Ha ocurrido un error!',
        })
      }
    );
}

}
