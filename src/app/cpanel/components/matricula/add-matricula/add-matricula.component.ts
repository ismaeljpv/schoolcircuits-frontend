import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { GetDataService } from '../../../services/get-data.service';
import { PostDataService } from '../../../services/post-data.service'; 
import { from } from 'rxjs';
import swal from 'sweetalert2';


@Component({
  selector: 'app-add-matricula',
  templateUrl: './add-matricula.component.html',
  styleUrls: ['./add-matricula.component.css']
})
export class AddMatriculaComponent implements OnInit {

  addMatriculaForm: FormGroup;
  planteles: Array<any> = [];
  temporalData: any;
  

  constructor(private formBuilder: FormBuilder, private getData: GetDataService, private postCircuit: PostDataService) { 
    this.addMatriculaForm = formBuilder.group({
      plantel: ['', Validators.required],
      niveles: [ '', Validators.required],
      aulas: ['', Validators.required],
      secciones:['', Validators.required],
      grado: ['', Validators.required],
      varones:['', Validators.required],
      hembras: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getData.getSchoolsInfo().subscribe(
      response =>{
       
        this.temporalData = response;
        for( let i of this.temporalData){
          let json = {
            'idplantel': i.idplantel,
            'plantel': i.plantel
          }
          this.planteles.push(json);
          }
          
      },
      error =>{
        console.log(error);
      }
    );

  }

  postData(form: FormGroup){
    
    let _jsn = {
  
      'idplantel': parseInt(form.controls['plantel'].value),
      'descripcionNivel': form.controls['niveles'].value,
      'aulas': parseInt(form.controls['aulas'].value),
      'secciones': parseInt(form.controls['secciones'].value),
      'grado': form.controls['grado'].value,
      'varones': parseInt(form.controls['varones'].value),
      'hembras': parseInt(form.controls['hembras'].value),
      'total': parseInt(form.controls['varones'].value) + parseInt(form.controls['hembras'].value)     
    }
    
    console.log(_jsn);
    this.postCircuit.postMatricula(_jsn).subscribe(
      response => {
        swal.fire({
          type: 'success',
          title: 'Se ha Agregado correctamente!',
        });
        this.addMatriculaForm.reset();
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
