import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GetDataService } from '../../../services/get-data.service'; 
import { PostDataService } from '../../../services/post-data.service';
import swal from 'sweetalert2'; 

@Component({
  selector: 'app-add-deparment',
  templateUrl: './add-deparment.component.html',
  styleUrls: ['./add-deparment.component.css']
})
export class AddDeparmentComponent implements OnInit {

  addDeparmentForm: FormGroup;
  plan:any;
  schools : Array<any> = [];
  temporalData: any;
  id:any;

  constructor(public route: ActivatedRoute, private formBuilder: FormBuilder, private getData: GetDataService, private postInfo: PostDataService) { 
    this.addDeparmentForm = formBuilder.group({
      descripcion: ['', Validators.required],
      plan: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
    });

    this.getData.getPlan(this.id).subscribe(
      response =>{
        console.log(response);
        this.plan = response;
        this.addDeparmentForm.get('plan').setValue(this.plan.titulo);
      },
      error =>{
        console.log(error);
      }
    );
  }

  postData(form: FormGroup){
    
    let jsn ={
      "descripcion":  form.controls['descripcion'].value,
      "idplan": parseInt(this.id)
    }

    console.log(jsn);
    this.postInfo.postDepto(jsn).subscribe(
      response =>{
        swal.fire({
          type: 'success',
          title: 'Se ha guardado correctamente!',
        })
        this.addDeparmentForm.reset();
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
