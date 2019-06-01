import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetDataService } from '../../../services/get-data.service';
import { DeleteDataService } from '../../../services/delete-data.service';
import { Subject } from 'rxjs';
import swal from 'sweetalert2'; 

@Component({
  selector: 'app-deparment-panel',
  templateUrl: './deparment-panel.component.html',
  styleUrls: ['./deparment-panel.component.css']
})
export class DeparmentPanelComponent implements OnInit {

  
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  datos: any;
  id:any;
  previewimg: any;
  image: HTMLImageElement;

  constructor(public route: ActivatedRoute, private getData: GetDataService, private deleteData: DeleteDataService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
    });
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

    this.getData.getDepartments(this.id).subscribe(
      response =>{
       
        this.datos = response;
        this.dtTrigger.next(); 
      },
      error=>{
        console.log(error);
      }
    );

  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
   }

  deleteDeparment(id:any){
    
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
      this.deleteData.deleteDpto(id).subscribe(
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
