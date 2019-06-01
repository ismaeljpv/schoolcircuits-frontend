import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetDataService } from '../../../services/get-data.service';
import { Subject } from 'rxjs';
import * as $ from 'jquery';

declare const require: any;
const jsPDF = require('jspdf');
require('jspdf-autotable');


@Component({
  selector: 'app-view-school',
  templateUrl: './view-school.component.html',
  styleUrls: ['./view-school.component.css']
})
export class ViewSchoolComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();


  id: any;
  
  needs ={
    "situacionactual":'',
    "causa":''
  };
  
  circuit ={
    "nombrecircuital":'',
    "codigoCircuital":'',
    "lema":'',
    "nroplanteles":'',
    "estado":'',
    "parroquia":'',
    "municipio":'',
    "puntoycirculo":''
  };
  
  supervisor = {
    "nombre1":'',
    "nombre2":'',
    "apellido1":'',
    "cedula":'',
    "cargoNominal":'',
    "cargoFuncion":''
  };
  
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
  
  persons: Array<any> = [];
  previewimg: any;
  image: HTMLImageElement;
  imgb64: any;

  constructor(private getData: GetDataService, private route: ActivatedRoute) { }

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

    this.getData.getAllSchoolInfo(this.id).subscribe(
      response =>{
        console.log(response);
        //Circuitos
        this.circuit['nombrecircuital'] = response.circuit.nombrecircuital;
        this.circuit['codigoCircuital'] = response.circuit.codigoCircuital;
        this.circuit['lema'] = response.circuit.lema;
        this.circuit['nroplanteles'] = response.circuit.nroplanteles;
        this.circuit['estado'] = response.circuit.estado;
        this.circuit['parroquia'] = response.circuit.parroquia;
        this.circuit['municipio'] = response.circuit.municipio;
        this.circuit['puntoycirculo'] = response.circuit.puntoycirculo;
        
        //Supervisor
        this.supervisor['nombre1'] = response.supervisor.nombre1;
        this.supervisor['nombre2'] = response.supervisor.nombre2;
        this.supervisor['apellido1'] = response.supervisor.apellido1;
        this.supervisor['cedula'] = response.supervisor.cedula;
        this.supervisor['cargoNominal'] = response.supervisor.cargoNominal;
        this.supervisor['cargoFuncion'] = response.supervisor.cargoFuncion;
        
        //Necesidades
        this.needs['situacionactual'] = response.needs.situacionactual;
        this.needs['causa'] = response.needs.causa;
        
        this.persons = response.persons;
        this.dtTrigger.next();
        
        //Escuela
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
    doc.text('Personal Registrado', 80, 20);
    
    doc.autoTable({
      startY: 35,
      html: '#datatable',
      });
    

    doc.save(`${this.school['plantel']}.pdf`);
   
  }
  

}
