import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../../_services/authentication.service';
import { Roles } from '../../../../_models/roles';
import { GetDataService } from '../../../services/get-data.service';
import { DeleteDataService } from '../../../services/delete-data.service';
import { ShowSchoolComponent } from '../show-school/show-school.component';
import { Subject } from 'rxjs';
import swal from 'sweetalert2';

@Component({
  selector: 'app-school-panel',
  templateUrl: './school-panel.component.html',
  styleUrls: ['./school-panel.component.css']
})
export class SchoolPanelComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  datos: any;
  datosTemporales: any; 
  school : any;
  dtTrigger: Subject<any> = new Subject();
  user : any;

  constructor(private service: AuthenticationService, private getData: GetDataService, private deleteData: DeleteDataService) { }

  ngOnInit() {
    this.tableOptions();
    this.user = this.service.perfil();
  }

  tableOptions(){

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
    this.getData.getSchoolsInfo().subscribe(
      response =>{
         this.datosTemporales = response;
         this.datos = this.datosTemporales;
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

  deleteSchool(id){

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
        this.deleteData.deleteSchool(id).subscribe(
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


  // Función para mostrar modal con detalles del circuito
  show_school(id: any){
    this.getData.sendSchoolId(id);
    new ShowSchoolComponent(this.getData).ngOnInit();
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
