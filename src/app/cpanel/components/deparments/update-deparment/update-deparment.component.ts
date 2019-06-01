import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GetDataService } from '../../../services/get-data.service'; 
import { PostDataService } from '../../../services/post-data.service'; 
import { PutDataService } from '../../../services/put-data.service';
import swal from 'sweetalert2'; 

@Component({
  selector: 'app-update-deparment',
  templateUrl: './update-deparment.component.html',
  styleUrls: ['./update-deparment.component.css']
})
export class UpdateDeparmentComponent implements OnInit {

  updateDeparmentForm: FormGroup;
  plan:any;
  dpto : any;
  temporalData: any;
  id:any;

  constructor(public route: ActivatedRoute, private formBuilder: FormBuilder, private getData: GetDataService, private postInfo: PostDataService, private putData: PutDataService) {
    this.updateDeparmentForm = formBuilder.group({
      descripcion: ['', Validators.required],
      plan: ['', Validators.required]
    });
   }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
    });
    this.getData.getOneDeparment(this.id).subscribe(
      response=>{
       this.dpto = response;
       this.updateDeparmentForm.get('descripcion').setValue(this.dpto.descripcion);
       this.getData.getPlan(this.dpto.idplan).subscribe(
        response =>{
          console.log(response);
          this.plan = response;
          this.updateDeparmentForm.get('plan').setValue(this.plan.titulo);
        },
        error =>{
          console.log(error);
        }
      );
       
      },
      error=>{
        console.log(error);
      }
    );
  }

  postData(form: FormGroup){
    let jsn ={
      "descripcion":  form.controls['descripcion'].value,
      "idplan": this.plan.idplan,
      "iddptoPlan": this.dpto.iddptoPlan
    }
    
    console.log(jsn);
    this.putData.putDpto(this.id, jsn).subscribe(
      response =>{
        swal.fire({
          type: 'success',
          title: 'Se ha guardado correctamente!',
        })
        this.updateDeparmentForm.reset();
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
