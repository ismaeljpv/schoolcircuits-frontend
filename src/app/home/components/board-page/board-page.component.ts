import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../../services/get-data.service';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss']
})
export class BoardPageComponent implements OnInit {
  
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  event: any;
  eventos: any;
  datos: Array<any> =[];
  constructor(private getData: GetDataService) { }

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
    this.getData.getBoardEvents().subscribe(
      response =>{
        this.eventos = response;
        for(let i of this.eventos){
          let jsn={
            "circuito": i.Circuit.nombrecircuital,
            "titulo": i.Event.titulo,
            "evento": i.Event.contenido,
            "fecha": this.FormatDate(i.Event.fechaEvento)
          }
          this.datos.push(jsn);
        }
        this.event = this.datos;
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
    let day = (inputDate.getDate()  < 10) ?  '0'+inputDate.getDate().toString()  : inputDate.getDate().toString();
    var formattedDate = year +'-'+ month +'-'+ day;
    return formattedDate;
 }

}
