import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GetDataService } from '../../../services/get-data.service';
import { PutDataService } from '../../../services/put-data.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-update-action',
  templateUrl: './update-action.component.html',
  styleUrls: ['./update-action.component.css']
})
export class UpdateActionComponent implements OnInit {

  id:any;
  updateActionForm: FormGroup;
  accion:any;

  constructor(public route: ActivatedRoute, private getData: GetDataService ,private formBuilder: FormBuilder, private putAction: PutDataService) {
    this.updateActionForm = formBuilder.group({
      descripcion: ['', Validators.required],
      totalParticipantes: ['', Validators.required]
    });
   }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
    });
    
    this.getData.getAction(this.id).subscribe(
      response =>{
        this.accion = response;
        this.updateActionForm.get('descripcion').setValue(this.accion.descripcion);
        this.updateActionForm.get('totalParticipantes').setValue(this.accion.totalParticipantes);
      },
      error =>{
        console.log(error);
      }
    );
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
   }

  postData(form: FormGroup){
    let jsn = {
      'idaccion': this.accion.idaccion, 
      'descripcion': form.controls['descripcion'].value,
      'totalParticipantes': form.controls['totalParticipantes'].value,
      'iddptoPlan': this.accion.iddptoPlan
    }
    console.log(jsn);

    this.putAction.putAction(this.id, jsn).subscribe(
      response =>{
        swal.fire({
          type: 'success',
          title: 'Se ha guardado correctamente!',
        })
        this.updateActionForm.reset();
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
