import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GetDataService } from '../../../services/get-data.service';
import { PutDataService } from '../../../services/put-data.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-update-school',
  templateUrl: './update-school.component.html',
  styleUrls: ['./update-school.component.css']
})
export class UpdateSchoolComponent implements OnInit {

  updateSchoolForm: FormGroup;
  school:any;
  id: any;
  circuitos: any;
  blobimg: any;
  previewimg: any;
  image: HTMLImageElement;

  constructor(public route: ActivatedRoute, private formBuilder: FormBuilder, private getData: GetDataService, private putData: PutDataService) {
    this.updateSchoolForm = formBuilder.group({
      plantel: ['', Validators.required], //si
      codigoAdmin: ['', Validators.required], //si
      codigoDea: ['', Validators.required], //si
      rif: ['', Validators.required], //si
      codigoEstadistico: ['', Validators.required], //si
      codigoElectoral:['', Validators.required], //si
      direccion: ['', Validators.required], //si
      peicLema: ['', Validators.required], //si
      anoFundacion: ['', Validators.required], //si
      centroVotacion: ['', Validators.required], //si
      sige: ['', Validators.required], //si
      latitud: ['', Validators.required], //si
      longitud: ['', Validators.required], //si
      observaciones: ['', Validators.required], //si
      dependencias:['', Validators.required], //si
      niveles:['', Validators.required], //si
      condInmueble: ['', Validators.required], //si
      circuito: ['', Validators.required],
      logo: ['', Validators.required] //si
    });
   }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
    });

    this.getData.getCircuitsDto().subscribe(
      response =>{
        this.circuitos = response;
      },
      error =>{
        console.log(error);
      }
    );

    this.getData.getFullSchool(this.id).subscribe(
      response =>{
        this.school = response;

        // Vista previa de la imagen
        this.previewimg = document.getElementById('preview');
        this.image = document.createElement('img');
        this.image.src =  this.school.logo;
        this.image.style.height = 190+"px";
        this.previewimg.innerHTML = '';
        this.previewimg.append(this.image);
       
        this.updateSchoolForm.get('plantel').setValue(this.school.plantel);
        this.updateSchoolForm.get('codigoAdmin').setValue(this.school.codigoAdmin);
        this.updateSchoolForm.get('codigoDea').setValue(this.school.codigoDea);
        this.updateSchoolForm.get('codigoElectoral').setValue(this.school.codigoElectoral);
        this.updateSchoolForm.get('rif').setValue(this.school.rif);
        this.updateSchoolForm.get('direccion').setValue(this.school.direccion);
        this.updateSchoolForm.get('peicLema').setValue(this.school.peicLema);
        this.updateSchoolForm.get('anoFundacion').setValue(this.school.anoFundacion);
        this.updateSchoolForm.get('centroVotacion').setValue(this.school.centroVotacion);
        this.updateSchoolForm.get('sige').setValue(this.school.sige);
        this.updateSchoolForm.get('dependencias').setValue(this.school.dependencias);
        this.updateSchoolForm.get('latitud').setValue(this.school.georefLatitud);
        this.updateSchoolForm.get('longitud').setValue(this.school.georefLongitud);
        this.updateSchoolForm.get('codigoEstadistico').setValue(this.school.codigoEstadistico);
        this.updateSchoolForm.get('observaciones').setValue(this.school.observaciones);
        this.updateSchoolForm.get('niveles').setValue(this.school.niveles);
        this.updateSchoolForm.get('condInmueble').setValue(this.school.condInmueble);
        this.updateSchoolForm.get('circuito').setValue(this.school.idcircuito);
      },
      error =>{
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

  alphaOnly(event) {
    let key = event.keyCode;
    return ((key >= 65 && key <= 90) || key == 8  || (key > 96 && key < 123));
  };

  alphaWithSpace(event) {
    let key = event.keyCode;
    return ((key >= 65 && key <= 90) || key == 8  || (key > 96 && key < 123) || key == 32 || key == 190);
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

  postData(form: FormGroup){
    console.log(form);
    // Ejemplo 
    let _jsn = {
      'idplantel': this.school.idplantel,
      'plantel': form.controls['plantel'].value,
      'codigoAdmin': form.controls['codigoAdmin'].value,
      'codigoDea': form.controls['codigoDea'].value,
      'codigoEstadistico': form.controls['codigoEstadistico'].value,
      'codigoElectoral': form.controls['codigoElectoral'].value,
      'direccion': form.controls['direccion'].value,
      'peicLema': form.controls['peicLema'].value,
      'anoFundacion': form.controls['anoFundacion'].value,
      'centroVotacion': form.controls['centroVotacion'].value,
      'sige': form.controls['sige'].value,
      'rif': form.controls['rif'].value,
      'georefLatitud': form.controls['latitud'].value,
      'georefLongitud': form.controls['longitud'].value,
      'observaciones': form.controls['observaciones'].value,
      'dependencias': form.controls['dependencias'].value,
      'niveles': form.controls['niveles'].value,
      'condInmueble': form.controls['condInmueble'].value,
      'idcircuito': parseInt(form.controls['circuito'].value),
      'logo': this.blobimg
    }
    console.log(_jsn);
    this.putData.putSchool(this.id, _jsn).subscribe(
      response =>{
        swal.fire({
          type: 'success',
          title: 'Se ha guardado correctamente!',
        })
        this.updateSchoolForm.reset();
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
