import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GetDataService } from '../../../services/get-data.service';
import { PostDataService } from '../../../services/post-data.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-add-school',
  templateUrl: './add-school.component.html',
  styleUrls: ['./add-school.component.css']
})
export class AddSchoolComponent implements OnInit {

  addSchoolForm: FormGroup;
  circuitos: any;
  blobimg: any;
  previewimg: any;
  image: HTMLImageElement;

  constructor(private formBuilder: FormBuilder, private getData: GetDataService, private postSchool: PostDataService) {
    this.addSchoolForm = formBuilder.group({
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
    this.getData.getCircuitsDto().subscribe(
      response =>{
        this.circuitos = response;
      },
      error =>{
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
    //let persona = this.service.decodeToken();
    console.log(form);
    // Ejemplo 
    let _jsn = {
      
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
    this.postSchool.postSchool(_jsn).subscribe(
      response =>{
        swal.fire({
          type: 'success',
          title: 'Se ha guardado correctamente!',
        })
        this.addSchoolForm.reset();
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
