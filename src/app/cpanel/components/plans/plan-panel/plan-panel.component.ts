import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { GetDataService } from '../../../services/get-data.service';
import { DeleteDataService } from '../../../services/delete-data.service';
import { PutDataService } from '../../../services/put-data.service';
import { AuthenticationService } from '../../../../_services/authentication.service';
import { Roles } from '../../../../_models/roles';
import swal from 'sweetalert2';

@Component({
  selector: 'app-plan-panel',
  templateUrl: './plan-panel.component.html',
  styleUrls: ['./plan-panel.component.css']
})
export class PlanPanelComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  datos: any;
  datosTemporal: Array<any> = [];
  plans:any;
  json: any;
  user:any;

  constructor(private service: AuthenticationService, private getData: GetDataService, private putData:PutDataService ) { }

  ngOnInit() {
    this.dtOptions = {
      'language': {
          'processing':     'Procesando...',
          'lengthMenu':     'Mostrar _MENU_ registros',
          'zeroRecords':    'No se encontraron resultados',
          'emptyTable':     'Ningún dato disponible en esta tabla',
          'info':           'Mostrando  _START_ al _END_ de _TOTAL_ registros',
          'infoEmpty':      'Mostrando registros del 0 al 0 de un total de 0 registros',
          'infoFiltered':   '(filtrado de un total de _MAX_ registros)',
          'infoPostFix':    '',
          'search':         'Buscar:',
          'url':            '',
          'loadingRecords': 'Cargando...',
          'paginate': {
              'first':    'Primero',
              'last':     'Último',
              'next':     'Siguiente',
              'previous': 'Anterior'
          },
          'aria': {
              'sortAscending':  ': Activar para ordenar la columna de manera ascendente',
              'sortDescending': ': Activar para ordenar la columna de manera descendente'
          }
      }
    };
    this.user = this.service.perfil();
    this.getData.getPlans().subscribe(
      response =>{
          console.log(response);
          this.plans = response;

          for(let i of this.plans){
              console.log(i.Circuit);
            this.json = {
                "idplan": i.Plan.idplan,
                "titulo": i.Plan.titulo,
                "momento": i.Plan.momento,
                "circuito": i.Circuit.nombrecircuital,
                "idcircuito": i.Circuit.idcircuito
              }
              this.datosTemporal.push(this.json);
          }
          this.datos = this.datosTemporal;
          this.dtTrigger.next();
      },
      error =>{
          console.log(error);
      }

    );
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
   }

  deletePlan(id:any){

    
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
      this.putData.InactivatePlan(id, this.json).subscribe(
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

  get isSupervisor(){
    return this.user && this.user.perfil === Roles.SUPERVISOR;
  }

  get isAdmin(){
    return this.user && this.user.perfil === Roles.ADMINISTRADOR;
  }

  get isDirector(){
    return this.user && this.user.perfil === Roles.DIRECTOR;
  }


}
