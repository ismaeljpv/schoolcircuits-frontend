import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../../../services/get-data.service'; 
import { DeleteDataService } from '../../../services/delete-data.service';
import { ShowUserComponent } from '../show-user/show-user.component';
import { Subject } from 'rxjs';
import swal from 'sweetalert2';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  datos: Array<any> = [];
  datosTemporal: Array<any> = [];
  user: any;
  show:boolean=false;
  Usuarios :any;
  

  constructor( private getData: GetDataService, private deleteData: DeleteDataService ) { }

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
    
    this.getData.getUsers().subscribe(
      response => {
       this.Usuarios = response.body;
    
        for(let i of this.Usuarios){
          let json = {
            "idusuario": i.User.idusuario,
            "correo": i.User.correo,
            "nombre": i.Person.nombre1,
            "apellido": i.Person.apellido1,
            "nombreusuario": i.User.nombreusuario,
            "perfil": i.User.perfil,
            "idpersona": i.Person.idpersona

          }
          this.datosTemporal.push(json);
        
        }
        this.datos = this.datosTemporal;
        this.dtTrigger.next();
      },
      error => {
       console.log(error);
      }
    );
  
    
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
   }
  
  deleteUser(id){

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
        this.deleteData.deleteUser(id).subscribe(
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
  show_user(id: any){
  
    this.getData.sendUserId(id);
    new ShowUserComponent(this.getData).ngOnInit();
  }

}
