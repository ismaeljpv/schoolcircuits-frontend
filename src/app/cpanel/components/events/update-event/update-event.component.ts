import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PutDataService } from '../../../services/put-data.service';
import { GetDataService } from '../../../services/get-data.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css']
})
export class UpdateEventComponent implements OnInit {

  id:any;
  updateEventForm: FormGroup;
  circuitos :any;
  evento: any;
  blobimg: any;
  temporalData: any;
  previewimg: any;
  image: HTMLImageElement;


  constructor(private formBuilder: FormBuilder, public route: ActivatedRoute, private getData: GetDataService, private putData: PutDataService) { 
    this.updateEventForm = formBuilder.group({
      evento: ['', Validators.required],
      contenido: ['', Validators.required],
      circuito: ['', Validators.required],
      fecha: ['', Validators.required],
      imagen:['', Validators.required]
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

    this.getData.getEvent(this.id).subscribe(
      response =>{
        this.evento = response;
        this.updateEventForm.get("evento").setValue(this.evento.titulo);
        this.updateEventForm.get("contenido").setValue(this.evento.contenido);
        this.updateEventForm.get("circuito").setValue(this.evento.idcircuito);
        this.updateEventForm.get("fecha").setValue(this.FormatDate(this.evento.fechaEvento));
        this.previewimg = document.getElementById('preview');
        this.image = document.createElement('img');
        this.image.src =  this.evento.imagen;
        this.image.style.height = 190+"px";
        this.previewimg.innerHTML = '';
        this.previewimg.append(this.image);
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

  toblob(readerEvent){
    let binaryString = readerEvent.target.result;
     this.blobimg = "data:image/jpeg;base64," + btoa(binaryString);
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
      'idcartelera': parseInt(this.evento.idcartelera),
      'titulo': form.controls['evento'].value,
      'contenido': form.controls['contenido'].value,
      'idcircuito': parseInt(form.controls['circuito'].value),
      'fechaEvento': form.controls['fecha'].value,
      'imagen':  this.blobimg
     
    }
    
    console.log(_jsn);
   this.putData.putEvent(this.id, _jsn).subscribe(
     response =>{
      swal.fire({
        type: 'success',
        title: 'Se ha guardado correctamente!',
      })
      this.updateEventForm.reset();
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
