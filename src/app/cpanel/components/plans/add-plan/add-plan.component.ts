import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GetDataService } from '../../../services/get-data.service';
import { PostDataService } from '../../../services/post-data.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-add-plan',
  templateUrl: './add-plan.component.html',
  styleUrls: ['./add-plan.component.css']
})
export class AddPlanComponent implements OnInit {

  addPlanForm: FormGroup;
  circuitos: any;

  constructor(private formBuilder: FormBuilder, private getData: GetDataService, private postPlan: PostDataService) {
    this.addPlanForm = formBuilder.group({
      titulo: ['', Validators.required],
      momento: ['', Validators.required],
      circuito: ['', Validators.required]
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
  }

  
  postData(form: FormGroup){
    let _jsn = {
      'titulo': form.controls['titulo'].value,
      'momento': form.controls['momento'].value,
      'estado': 'ACTIVO',
      'idcircuito': parseInt(form.controls['circuito'].value)
    }
    
    this.postPlan.postPlan(_jsn).subscribe(
      response =>{
        swal.fire({
          type: 'success',
          title: 'Se ha guardado correctamente!',
        })
        this.addPlanForm.reset();
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
