import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GetDataService } from '../../../services/get-data.service';
import { PostDataService } from '../../../services/post-data.service';
import { DeleteDataService } from '../../../services/delete-data.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-school-nec',
  templateUrl: './school-nec.component.html',
  styleUrls: ['./school-nec.component.css']
})
export class SchoolNecComponent implements OnInit {

  addNeedForm: FormGroup;
  id:any;
  idNeeds: any;
  planteles: Array<any> = [];
  temporalData: any;
  activarBoton: boolean;
  idNec:any = null;
  jsn : any; 

  constructor(public route: ActivatedRoute, private formBuilder: FormBuilder, private getData: GetDataService, private postNec: PostDataService, private deleteData: DeleteDataService) {
    this.addNeedForm = formBuilder.group({
      causa: ['', Validators.required],
      situacionactual: ['', Validators.required],
      plantel: ['', Validators.required]
    });
   }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
    });

    this.getData.getSchool(this.id).subscribe(
      response =>{
          console.log(response);
          this.addNeedForm.get("plantel").setValue(response.plantel);
      },
      error =>{
         console.log(error);
      }
    );

    this.getData.getNeed(this.id).subscribe(
      response =>{
        this.activarBoton = false;
        if(response !== null){
         
          this.idNeeds = response.idplantelnec;
          this.addNeedForm.get('causa').setValue(response.causa);
          this.addNeedForm.get('situacionactual').setValue(response.situacionactual);
          this.activarBoton = true;
        }
      }, 
      error =>{
        console.log(error);
      }
    );
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
   }

  deleteNeed(id:any){
    swal.fire({
      title: 'Estas Seguro?',
      text: "Se procedera a eliminar el registro!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText:'Cancelar'
    }).then( (result) => {
      if (result.value) {
        this.deleteData.deleteNeed(id).subscribe(
          async response =>{
           swal.fire({
             type: 'success',
             title: 'Se ha Eliminado correctamente!',
           })
             await this.sleep(2000);
             location.reload();
          },
          error =>{
           swal.fire({
             type: 'error',
             title: 'Ha ocurrido un error!',
           })
          }
        );
      }
    })
  }

  postData(form: FormGroup){
  if(this.idNeeds){
      this.jsn = {
        'idplantelnec': this.idNeeds,
        'idpersona': null,
        'idplantel': parseInt(this.id),
        'causa': form.controls['causa'].value,
        'situacionactual': form.controls['situacionactual'].value
        
        }
   }else {
        this.jsn = {
          'idpersona': null,
          'idplantel': parseInt(this.id),
          'causa': form.controls['causa'].value,
          'situacionactual': form.controls['situacionactual'].value
        
        }
  }

      console.log(this.jsn);
      this.postNec.postNeeds(this.jsn).subscribe(
        async response => {
          console.log(response);
          swal.fire({
            type: 'success',
            title: 'Se ha guardado correctamente!',
          })
          await this.sleep(2000);
          location.reload();
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
