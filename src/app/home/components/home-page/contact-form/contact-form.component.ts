import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostDataService } from '../../../services/post-data.service';
import { LoadingComponent } from '../../loading/loading.component'; 
import swal from 'sweetalert2';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  contactForm: FormGroup;
  loader = new LoadingComponent();

  constructor(private formBuilder: FormBuilder, private postMsg: PostDataService) { 

    this.contactForm = formBuilder.group({
      nombre: ['', Validators.required],
      correo: ['', Validators.required],
      asunto: ['', Validators.required],
      mensaje: ['', Validators.required]
    });

  }

  ngOnInit() {
  }

  alphaOnly(event) {
    let key = event.keyCode;
    return ((key >= 65 && key <= 90) || key == 8  || key == 32 ||(key > 96 && key < 123));
  };

  postData(form: FormGroup){
    
    // Ejemplo 
    let _jsn = {
      'nombre': form.controls['nombre'].value,
      'correo': form.controls['correo'].value,
      'asunto': form.controls['asunto'].value,
      'mensaje': form.controls['mensaje'].value
    }
    console.log(_jsn);
    this.loader.showLoader();
    this.postMsg.postContact(_jsn).subscribe(
      response => {
        this.loader.hideLoader();
        swal.fire({
          type: 'success',
          title: 'Se ha enviado correctamente!',
        })
        this.contactForm.reset();
      },
      error => {
        this.loader.hideLoader();
        swal.fire({
          type: 'error',
          title: 'Ha ocurrido un error!',
        })
      }
    );

}

}
