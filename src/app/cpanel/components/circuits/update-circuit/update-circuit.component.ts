import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GetDataService } from '../../../services/get-data.service';
import { PutDataService } from '../../../services/put-data.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-update-circuit',
  templateUrl: './update-circuit.component.html',
  styleUrls: ['./update-circuit.component.css']
})
export class UpdateCircuitComponent implements OnInit {

  id:any;
  circuit: any;
  updateCircuitForm: FormGroup;
  previewimg: any;
  image: HTMLImageElement;
  temporalData: any;
  schools : Array<any> = [];
  supervisores : Array<any> = [];
  blobimg : any;

  constructor( public route: ActivatedRoute, private formBuilder: FormBuilder, private getData: GetDataService, private putData: PutDataService ) { 
    this.updateCircuitForm = formBuilder.group({
      nro: ['', Validators.required],
      nombrecircuital: ['', Validators.required],
      codigo: ['', Validators.required],
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

    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
    });
    this.getData.getSchoolsInfo().subscribe(
      response => {
        this.schools = response;
      },
      error => {
       console.log(error);
      }
    );

    this.getData.getSupervisores2().subscribe(
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
    this.getData.getCircuit(this.id).subscribe(
      response => {
        console.log(response);
        this.circuit = {
            "idcircuito": response.Circuit.idcircuito,
            "nro": response.Circuit.nro,
            "nombrecircuital": response.Circuit.nombrecircuital,
            "lema": response.Circuit.lema,
            "codigo": response.Circuit.codigoCircuital,
            "puntoycirculo": response.Circuit.puntoycirculo,
            "nroplanteles": response.Circuit.nroplanteles,
            "municipio": response.Circuit.municipio,
            "estado": response.Circuit.estado,
            "imagenGeoref": response.Circuit.imagenGeoref,
            "parroquia": response.Circuit.parroquia,
            "supervisor": response.Person
        }

        // Vista previa de la imagen
        this.previewimg = document.getElementById('preview');
        this.image = document.createElement('img');
        this.image.src =  this.circuit.imagenGeoref;
        this.image.style.height = 190+"px";
        this.previewimg.innerHTML = '';
        this.previewimg.append(this.image);

        this.updateCircuitForm.get('nro').setValue(this.circuit.nro);
        this.updateCircuitForm.get('nombrecircuital').setValue(this.circuit.nombrecircuital);
        this.updateCircuitForm.get('codigo').setValue(this.circuit.codigo);
        this.updateCircuitForm.get('lema').setValue(this.circuit.lema);
        this.updateCircuitForm.get('supervisor').setValue(this.circuit.supervisor);
        this.updateCircuitForm.get('estado').setValue(this.circuit.estado);
        this.updateCircuitForm.get('municipio').setValue(this.circuit.municipio);
        this.updateCircuitForm.get('parroquia').setValue(this.circuit.parroquia);
        this.updateCircuitForm.get('puntoycirculo').setValue(this.circuit.puntoycirculo);
        this.updateCircuitForm.get('nroplanteles').setValue(this.circuit.nroplanteles);
      },
      error => {
       console.log(error);
      }
    );
  }

    onlyNumbers(event) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
    }


  getimg(event){
    if(event.target.value === ""){
      this.previewimg = '';
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
    console.log(form);
    // Ejemplo 
    let _jsn = {
      'idcircuito': this.circuit.idcircuito,
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
    this.putData.putCircuit(this.id, _jsn).subscribe(
      response =>{
        swal.fire({
          type: 'success',
          title: 'Se ha guardado correctamente!',
        })
        this.updateCircuitForm.reset();
        this.image.src ="";
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
