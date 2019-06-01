import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { GetDataService } from '../../../services/get-data.service';
import { DeleteDataService } from '../../../services/delete-data.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-events-panel',
  templateUrl: './events-panel.component.html',
  styleUrls: ['./events-panel.component.css']
})
export class EventsPanelComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  datos: any;
  datosTemporal: Array<any> = [];
  event:any;
  eventos:any;

  constructor(private getData : GetDataService, private deleteData: DeleteDataService) { }

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

    this.getData.getEvents().subscribe(
      response =>{

        this.eventos = response;
      
        for(let i of this.eventos){      
         let json = {
           "idcartelera": i.Event.idcartelera,
            "evento": i.Event.titulo,
           "contenido": i.Event.contenido,
           "fechaEvento": this.FormatDate(i.Event.fechaEvento),
           "circuito": i.Circuit.nombrecircuital
          };
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

  FormatDate(iDate: Date) {
    let inputDate = new Date(iDate);
    let year = inputDate.getFullYear().toString();
    let month = ((inputDate.getMonth() + 1) < 10) ?  '0'+(inputDate.getMonth() + 1).toString() : (inputDate.getMonth() + 1).toString();
    var formattedDate = inputDate.getDate() +'-'+ month +'-'+ year;
    return formattedDate;
 }

 sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
 }

 deleteEvent(id){
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
      this.deleteData.deleteEvent(id).subscribe(
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
