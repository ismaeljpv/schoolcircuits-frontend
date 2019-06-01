import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GetDataService } from '../../../services/get-data.service';
import { PutDataService } from '../../../services/put-data.service';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-update-plan',
  templateUrl: './update-plan.component.html',
  styleUrls: ['./update-plan.component.css']
})
export class UpdatePlanComponent implements OnInit {

  updatePlanForm: FormGroup;
  circuitos: any;
  id: any;
  plan: any;
  constructor(public route: ActivatedRoute , private formBuilder: FormBuilder, private getData: GetDataService, private putPlan: PutDataService) { 
    this.updatePlanForm = formBuilder.group({
      titulo: ['', Validators.required],
      momento: ['', Validators.required],
      circuito: ['', Validators.required]
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

    this.getData.getPlan(this.id).subscribe(
      response =>{
          this.plan = response;
          this.updatePlanForm.get('titulo').setValue(this.plan.titulo);
          this.updatePlanForm.get('momento').setValue(this.plan.momento);
          this.updatePlanForm.get('circuito').setValue(this.plan.idcircuito);
      },
      error =>{
          console.log(error);
      }
    );
  }

  postData(form: FormGroup){
    let _jsn = {
      'idplan': this.plan.idplan,
      'titulo': form.controls['titulo'].value,
      'momento': form.controls['momento'].value,
      'estado': 'ACTIVO',
      'idcircuito': parseInt(form.controls['circuito'].value)
    }
    
    this.putPlan.putPlan(this.id, _jsn).subscribe(
      response =>{
        swal.fire({
          type: 'success',
          title: 'Se ha guardado correctamente!',
        })
        this.updatePlanForm.reset();
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
