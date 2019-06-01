import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostDataService } from '../../../services/post-data.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-add-action',
  templateUrl: './add-action.component.html',
  styleUrls: ['./add-action.component.css']
})
export class AddActionComponent implements OnInit {
  
  id:any;
  addActionForm: FormGroup;
  

  constructor(public route: ActivatedRoute, private formBuilder: FormBuilder, private postActions: PostDataService) {
    this.addActionForm = formBuilder.group({
      descripcion: ['', Validators.required],
      totalParticipantes: ['', Validators.required]
    });
   }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
    });
  }

  postData(form: FormGroup){
    let jsn = {
      'descripcion': form.controls['descripcion'].value,
      'totalParticipantes': form.controls['totalParticipantes'].value,
      'iddptoPlan': parseInt(this.id)
    }
    //console.log(jsn);
    this.postActions.postAction(jsn).subscribe(
      response =>{
        swal.fire({
          type: 'success',
          title: 'Se ha guardado correctamente!',
        })
        this.addActionForm.reset();
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
