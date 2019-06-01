import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { GetDataService } from '../../../services/get-data.service';
import { DeleteDataService } from '../../../services/delete-data.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-matricula-panel',
  templateUrl: './matricula-panel.component.html',
  styleUrls: ['./matricula-panel.component.css']
})
export class MatriculaPanelComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  datos: Array<any> = [];
  datosTemporal: Array<any> = [];
  dtTrigger: Subject<any> = new Subject();


 

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
    
    this.getData.getMatriculas().subscribe(

      response =>{
        console.log(response);
        this.datosTemporal = response;

        for(let i of this.datosTemporal){
          console.log(i.escuela.plantel);
          let matriculas = i.matriculas;
            for(let j of matriculas){
              let json = {
                "idmatricula": j.idmatricula,
                "plantel": i.escuela.plantel,
                "niveles": j.descripcionNivel,
                "grado": j.grado,
                "varones": j.varones,
                "hembras": j.hembras,
                "total":j.total,
                "idplantel": i.escuela.idplantel
              };
              this.datos.push(json);
            }
        }
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

  deleteMatricula(id){

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
        this.deleteData.deleteMatricula(id).subscribe(
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
