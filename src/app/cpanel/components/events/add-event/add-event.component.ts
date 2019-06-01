import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GetDataService } from '../../../services/get-data.service';
import { PostDataService } from '../../../services/post-data.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  addEventForm: FormGroup;
  circuitos :any;
  blobimg: any;
  temporalData: any;
  previewimg: any;
  image: HTMLImageElement;


  constructor(private formBuilder: FormBuilder, private getData: GetDataService, private postEvent: PostDataService) { 

    this.addEventForm = formBuilder.group({
      evento: ['', Validators.required],
      contenido: ['', Validators.required],
      circuito: ['', Validators.required],
      fecha: ['', Validators.required],
      imagen:['', Validators.required]
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
  
      'titulo': form.controls['evento'].value,
      'contenido': form.controls['contenido'].value,
      'idcircuito': parseInt(form.controls['circuito'].value),
      'fechaEvento': form.controls['fecha'].value,
      'imagen':  this.blobimg
     
    }
    
    console.log(_jsn);
    this.postEvent.postEvent(_jsn).subscribe(
      response =>{
        swal.fire({
          type: 'success',
          title: 'Se ha guardado correctamente!',
        })
        this.addEventForm.reset();
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
