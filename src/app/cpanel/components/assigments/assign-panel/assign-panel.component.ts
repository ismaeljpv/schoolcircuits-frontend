import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GetDataService } from '../../../services/get-data.service';
import { PostDataService } from '../../../services/post-data.service';
import { DeleteDataService } from '../../../services/delete-data.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-assign-panel',
  templateUrl: './assign-panel.component.html',
  styleUrls: ['./assign-panel.component.css']
})
export class AssignPanelComponent implements OnInit {

  addFunctionForm: FormGroup;
  id:any;
  person: any;
  planteles: Array<any> = [];
  temporalData: any;
  activarBoton: boolean;
  idFunction:any = null;
  jsn : any; 

  constructor(public route: ActivatedRoute, private formBuilder: FormBuilder, private getData: GetDataService, private postFunction: PostDataService, private deleteData: DeleteDataService) {

    this.addFunctionForm = formBuilder.group({
      plantel: ['', Validators.required],
      enlace: ['', Validators.required],
      voceroCe: ['', Validators.required]
    });

   }


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
    });

    this.getData.getFullPerson(this.id).subscribe(
      response =>{
        this.person = response;
        console.log(this.person);

          this.addFunctionForm.get('plantel').setValue(this.person.School.plantel);
        
       
      },
      error=>{
        console.log(error);
      }
    );
      
    this.getData.getFunction(this.id).subscribe(
      response =>{
        this.activarBoton = false;
        if(response !== null){
         
          this.idFunction = response.idfuncEsp;
          this.addFunctionForm.get('enlace').setValue(response.enlace);
          this.addFunctionForm.get('voceroCe').setValue(response.voceroCe);
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

  postData(form: FormGroup){
    //let persona = this.service.decodeToken();
    console.log(form);
    // Ejemplo 
    if(this.idFunction){
            this.jsn = {
                "idfuncEsp": this.idFunction,
                'idpersona': parseInt(this.id),
                'enlace': form.controls['enlace'].value,
                'voceroCe': form.controls['voceroCe'].value
              
              }
    }else {
              this.jsn = {
                "idfuncEsp": this.idFunction,
                'idpersona': parseInt(this.id),
                'enlace': form.controls['enlace'].value,
                'voceroCe': form.controls['voceroCe'].value
              
              }
    }

    console.log(this.jsn);
    
   this.postFunction.postFunction(this.jsn).subscribe(
     async response =>{
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

deletePerson(id:any){

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
      this.deleteData.deleteAssigment(id).subscribe(
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

}
