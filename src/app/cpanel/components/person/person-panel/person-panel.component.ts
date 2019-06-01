import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { GetDataService } from '../../../services/get-data.service';
import { DeleteDataService } from '../../../services/delete-data.service';
import { ShowPersonComponent } from '../show-person/show-person.component';
import swal from 'sweetalert2';

@Component({
  selector: 'app-person-panel',
  templateUrl: './person-panel.component.html',
  styleUrls: ['./person-panel.component.css']
})
export class PersonPanelComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  datos: any;
  person:any;
  constructor(private getData: GetDataService, private deleteData: DeleteDataService) { }

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

    this.getData.getPersons().subscribe(
      response =>{
          console.log(response);
          this.datos = response.body;
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

  deletePerson(id){

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
        this.deleteData.deletePerson(id).subscribe(
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
  show_person(id: any){
    this.getData.sendPersonId(id);
    new ShowPersonComponent(this.getData).ngOnInit();
  }


}
