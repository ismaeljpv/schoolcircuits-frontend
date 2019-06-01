import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GetDataService } from '../../../services/get-data.service';
import { PutDataService } from '../../../services/put-data.service'; 
import { from } from 'rxjs';
import swal from 'sweetalert2';


@Component({
  selector: 'app-update-matricula',
  templateUrl: './update-matricula.component.html',
  styleUrls: ['./update-matricula.component.css']
})
export class UpdateMatriculaComponent implements OnInit {

  id:any;
  updateMatriculaForm: FormGroup;
  planteles: Array<any> = [];
  temporalData: any;
  idmatricula: any;
  

  constructor(public route: ActivatedRoute, private formBuilder: FormBuilder, private getData: GetDataService, private putdata: PutDataService) { 
    this.updateMatriculaForm = formBuilder.group({
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

    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
    });
   

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
    
    this.getData.getOneMatric(this.id).subscribe(
      response =>{
       this.updateMatriculaForm.get('plantel').setValue(response.idplantel);
       this.updateMatriculaForm.get('secciones').setValue(response.secciones);
       this.updateMatriculaForm.get('niveles').setValue(response.descripcionNivel);
       this.updateMatriculaForm.get('grado').setValue(response.grado);
       this.updateMatriculaForm.get('varones').setValue(response.varones);
       this.updateMatriculaForm.get('hembras').setValue(response.hembras);
       this.updateMatriculaForm.get('aulas').setValue(response.aulas);

       this.idmatricula = response.idmatricula;
      },
      error =>{
        console.log(error);
      }
    );

  }

  postData(form: FormGroup){
    
    let _jsn = {
      'idmatricula': parseInt(this.idmatricula),
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
    this.putdata.putMatricula(this.idmatricula,_jsn).subscribe(
      response => {
        swal.fire({
          type: 'success',
          title: 'Se ha Actualizado correctamente!',
        });
        this.updateMatriculaForm.reset();
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
