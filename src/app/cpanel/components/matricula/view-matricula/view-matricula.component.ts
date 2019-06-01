import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetDataService } from '../../../services/get-data.service';
import { Subject } from 'rxjs';


declare const require: any;
const jsPDF = require('jspdf');
require('jspdf-autotable');

@Component({
  selector: 'app-view-matricula',
  templateUrl: './view-matricula.component.html',
  styleUrls: ['./view-matricula.component.css']
})
export class ViewMatriculaComponent implements OnInit {

  id:any;
  matriculas: Array<any> = [];

  school ={
    "plantel":'',
    "codigoAdmin":'',
    "codigoEstadistico":'',
    "codigoElectoral":'',
    "direccion":'',
    "rif":'',
    "dependencias":'',
    "condInmueble":'',
    "niveles":'',
    "georefLatitud":'',
    "georefLongitud":''
  };

  previewimg: any;
  image: HTMLImageElement;
  imgb64: any;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();



  constructor(public route: ActivatedRoute, private getData: GetDataService) { }

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
    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
    });
    
    this.getData.getMatriculasPlantel(this.id).subscribe(
      response =>{
       
        this.school['plantel'] = response.school.plantel;
        this.school['codigoAdmin'] = response.school.codigoAdmin;
        this.school['codigoEstadistico'] = response.school.codigoEstadistico;
        this.school['codigoElectoral'] = response.school.codigoElectoral;
        this.school['direccion'] = response.school.direccion;
        this.school['rif'] = response.school.rif;
        this.school['dependencias'] = response.school.dependencias;
        this.school['condInmueble'] = response.school.condInmueble;
        this.school['niveles'] = response.school.niveles;
        this.school['georefLatitud'] = response.school.georefLatitud;
        this.school['georefLongitud'] = response.school.georefLongitud;

        this.previewimg = document.getElementById('preview');
        this.image = document.createElement('img');
        this.image.src = response.school.logo;
        this.imgb64 = response.school.logo;
        this.image.style.height = 190+"px";
        this.previewimg.innerHTML = '';
        this.previewimg.append(this.image); 
        
        this.matriculas = response.matriculas;
        this.dtTrigger.next();
        
        console.log(this.school);
        console.log(this.matriculas);
      },
      error =>{
        console.log(error);
      }
    );

  }

  printPDF(){
    let d = new Date();
    let n = d.toLocaleDateString();

    let doc = new jsPDF(); 
    let specialElementHandlers = {
      '#editor': function (element, renderer) {
          return true;
      }
    };
    doc.addImage(`${this.image.src}`, 'JPEG', 20, 1, 35, 35);
    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.setFontSize(16);
    doc.text(`${this.school['plantel']}`,80,20);
    doc.setFont("courier");
    doc.setFontSize(10);
    doc.text(`${n}`,70,30);
    doc.fromHTML($("#info").html(), 15, 40, {
      'width': 170,
          'elementHandlers': specialElementHandlers
  });

    doc.addPage();
    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.setFontSize(16);
    doc.text('Matricula del Plantel', 80, 20);
    
    doc.autoTable({
      startY: 35,
      html: '#datatable',
      });
    

    doc.save(`${this.school['plantel']}.pdf`);
   
  }

}
