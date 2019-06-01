import { Component, OnInit } from '@angular/core';
import { data } from './data';
import { Subject } from 'rxjs';
import { GetDataService } from '../../../services/get-data.service';
import { DeleteDataService } from '../../../services/delete-data.service';
import { ShowCircuitComponent } from '../show-circuit/show-circuit.component';
import { AuthenticationService } from '../../../../_services/authentication.service';
import { Roles } from '../../../../_models/roles';
import swal from 'sweetalert2';

@Component({
  selector: 'app-circuit-panel',
  templateUrl: './circuit-panel.component.html',
  styleUrls: ['./circuit-panel.component.css']
})
export class CircuitPanelComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  datos: any;
  datosTemporal: Array<any> = [];
  circuit:any;
  circuitos:any;
  user:any;
  constructor(private service: AuthenticationService, private getData: GetDataService, private deleteData: DeleteDataService ) { }

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
    this.getData.getFullCircuits().subscribe(
      response =>{
        this.circuitos = response;
        for(let i of this.circuitos){
          console.log(i.Circuit);
          let json = {
            "idcircuito": i.Circuit.idcircuito,
            "nro": i.Circuit.nro,
            "circuito": i.Circuit.nombrecircuital,
            "codigo": i.Circuit.codigoCircuital,
            "puntoycirculo": i.Circuit.puntoycirculo,
            "nro_planteles": i.Circuit.nroplanteles,
            "municipio": i.Circuit.municipio,
            "supervisor": i.Person

          }
          this.datosTemporal.push(json);
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

  deleteCircuit(id){

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
        this.deleteData.deleteCircuit(id).subscribe(
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
  show_circuit(id: any){
    this.getData.sendCircuitId(id);
    new ShowCircuitComponent(this.getData).ngOnInit();
   
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
