import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../../../services/get-data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostDataService } from '../../../services/post-data.service';
import { Subject } from 'rxjs';
import * as $ from 'jquery';

declare const require: any;
const jsPDF = require('jspdf');
require('jspdf-autotable');

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  CircuitForm: FormGroup;
  PlantelForm: FormGroup;
  circuito : any;
  enlaces: Array<any> = [];
  circuitos: any;
  codigocir : any;
  planteles: Array<any> = [];
  temporalData: any;
  temporalData1: any;
  personas : Array<any> = [];
  personal : Array<any> = []; 
  plantel: any;
  rif: any;
  estatus: any;
  allPersonal : Array<any> = [];
  allMatriculas :Array<any> = [];
  matCircuit: any;
  image: HTMLImageElement;
  imgpdf : HTMLImageElement;


  constructor(private formBuilder: FormBuilder, private getData: GetDataService, private postEstatus: PostDataService) { 
    this.CircuitForm = formBuilder.group({
      circuito: ['', Validators.required],
      enlace : ['', Validators.required]
    });
    this.PlantelForm = formBuilder.group({
      plantel: ['', Validators.required],
      estatus: ['', Validators.required] 
    });
  }

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

    this.getData.getCircuitsDto().subscribe(
      response =>{
        this.circuitos = response;
      },
      error =>{
        console.log(error);
      }
    );

    this.getData.getSchoolsInfo().subscribe(
      response =>{
       
        this.temporalData = response;
        for( let i of this.temporalData){
          let json = {
            'idplantel': i.idplantel,
            'plantel': i.plantel
          }
          this.planteles.push(json);
          }
          console.log(this.planteles);
        
      },
      error => {
        console.log(error);
      }
    );
    
    this.imgpdf = document.createElement('img');
    this.imgpdf.src = `
    data:image/png;base64,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
    `;

  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
   }

  reportDirectores(id:any){

      this.getData.getDirectores(id).subscribe(
      response =>{
         
        
         this.circuito = response.circuito;
         this.codigocir = response.codigocir;
         this.temporalData1 = response.directores;
         this.personas = [];
         
         for(let i of this.temporalData1){
         let directores = {
            "nombre": i.persona.nombre1 +" "+ i.persona.nombre2,
            "apellido": i.persona.apellido1 +" "+i.persona.apellido2,
            "cedula": i.persona.cedula,
            "cargo": i.persona.cargoFuncion,
            "correo": i.persona.correoPersona,
            "telefono": i.persona.telefono,
            "plantel": i.plantel,
            "rif": i.rif
          }
          this.personas.push(directores);
         }
         this.pdfDirectores();
      },
      error =>{
          console.log(error);
      }
    );

  }

  reportParticipacion(id:any, enlace:any){

    let jsn = {
      "idcircuito": parseInt(id),
      "enlace": enlace
     }

     console.log(jsn);

    this.postEstatus.postParticipacion(jsn).subscribe(
      response =>{
         
        
         this.circuito = response.circuito;
         this.codigocir = response.codigocir;
         this.temporalData1 = response.enlaces;
         this.personas = [];
         
         for(let i of this.temporalData1){
         let jsn = {
            "nombre": i.nombre,
            "apellido": i.apellido,
            "cedula": i.cedula,
            "cargo": i.cargoFuncion,
            "enlace": i.enlace.enlace,
            "telefono": i.telefono,
            "plantel": i.plantel,
            "rif": i.rif
          }
          this.personas.push(jsn);
         }
         this.pdfParticipacion();
      },
      error =>{
          console.log(error);
      }
    );
  }

  async pdfParticipacion(){

    await this.sleep(1000);

    let d = new Date();
    let n = d.toLocaleDateString();
    
    let doc = new jsPDF({
      orientation: 'landscape'
    })
    
    doc.addImage(`${this.imgpdf.src}`, 'PNG',  180, 5, 100, 20);
    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.setFontSize(16);
    doc.text(`Circuito ${this.circuito}`,20,40);
    doc.text(`Código Administrativo: ${this.codigocir}`,20,50);
    doc.setFont("courier");
    doc.setFontSize(10);
    doc.text(`${n}`,22,58);
    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.text('ENLACES', 146, 65);

    doc.autoTable({
      startY: 75,
      html: '#datatable2',
      });
    doc.save(`Consejo De Participacion ${this.circuito}.pdf`);
  }

    async pdfDirectores(){

    await this.sleep(1000);

    let d = new Date();
    let n = d.toLocaleDateString();
    
    let doc = new jsPDF({
      orientation: 'landscape'
    })
    
    doc.addImage(`${this.imgpdf.src}`, 'PNG', 180, 5, 100, 20);
    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.setFontSize(16);
    doc.text(`Circuito ${this.circuito}`,20,40);
    doc.text(`Código Administrativo: ${this.codigocir}`,20,50);
    doc.setFont("courier");
    doc.setFontSize(10);
    doc.text(`${n}`,22,58);
    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.text('Consejo Directivo', 140, 65);

    doc.autoTable({
      startY: 75,
      html: '#datatable',
      });
    doc.save(`Consejo Directivo ${this.circuito}.pdf`);
  }

  reportPersonal(id:any){
    this.getData.getFullPersonal(id).subscribe(
      response =>{
        console.log(response);
        this.allPersonal = [];
        this.temporalData1 = response.personal;
        this.plantel = response.plantel;
        this.rif = response.rif;
     
        for(let i of this.temporalData1){
          
           let jsn = {
             "nombre": i.nombre1 +" "+ i.nombre2,
             "apellido": i.apellido1 +" "+ i.apellido2,
             "cedula": i.cedula,
             "cargo": i.cargoFuncion,
             "correo": i.correoPersona,
             "telefono": i.telefono,
             "estatus": i.estatus,
             "direccion": i.direccion
           } 
           this.allPersonal.push(jsn);
          }

          this.pdfPersonal();
      },
      error =>{
        console.log(error);
      }

    );
  }


  reportEstatus(id:any, estatus:any){
     
      let jsn = {
       "idschool": parseInt(id),
       "status": estatus
      }
      
      this.temporalData1 = [];

      this.postEstatus.postEstatus(jsn).subscribe(
        
        response =>{
          console.log(response);
          this.personal = [];
          this.temporalData1 = response;

          for(let i of this.temporalData1){
            console.log(i.persona);
            this.plantel = i.plantel;
            this.rif = i.rif;
            this.estatus = i.persona.estatus;
            let jsn = {
               "nombre": i.persona.nombre1 +" "+i.persona.nombre2,
               "apellido": i.persona.apellido1+" "+i.persona.apellido2,
               "cedula": i.persona.cedula,
               "cargo": i.persona.cargoFuncion,
               "estatus": i.persona.estatus,
               "telefono": i.persona.telefono,
               "plantel": i.plantel,
               "rif": i.rif
             }
             
             this.personal.push(jsn);
            }
            

            this.pdfEstatus();
        },
        error =>{
          console.log(error);
        }
      );

     
  }

  async pdfPersonal(){

    await this.sleep(1000);

    let d = new Date();
    let n = d.toLocaleDateString();
    
    let doc = new jsPDF({
      orientation: 'landscape'
    })
    
    doc.addImage(`${this.imgpdf.src}`, 'PNG', 182, 5, 100, 20);
    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.setFontSize(16);
    doc.text(`PLANTEL ${this.plantel}`,20,40);
    doc.text(`Rif: ${this.rif}`,20,50);
    doc.setFontSize(12);
    doc.text(`PERSONAL`, 140, 65);
    doc.setFont("courier");
    doc.setFontSize(10);
    doc.text(`${n}`,20,60);
    doc.autoTable({
      startY: 75,
      html: '#datatable4',
      });
    doc.save(`Personal ${this.plantel}.pdf`);


  }

  async pdfEstatus(){

    await this.sleep(1000);

    let d = new Date();
    let n = d.toLocaleDateString();
    
    let doc = new jsPDF({
      orientation: 'landscape'
    })
    
    doc.addImage(`${this.imgpdf.src}`, 'PNG', 182, 5, 100, 20);
    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.setFontSize(16);
    doc.text(`PLANTEL ${this.plantel}`,20,40);
    doc.text(`Rif: ${this.rif}`,20,50);
    doc.setFontSize(14);
    doc.text(`PERSONAL ${this.estatus}`, 130, 60);
    doc.setFont("courier");
    doc.setFontSize(10);
    doc.text(`${n}`,20,60);

    doc.autoTable({
      startY: 75,
      html: '#datatable3',
      });
    doc.save(`Personal ${this.estatus}/${this.plantel}.pdf`);


  }

  reportMatricula(id:any){
    this.allMatriculas = [];
    this.getData.getMatriculasByCircuit(id).subscribe(
      response =>{
        this.allMatriculas = response.planteles;
        this.matCircuit = response.circuit;
        console.log(this.allMatriculas);
        this.pdfMatricula();
      },
      error =>{
        console.log(error);
      }
    );
  }

  async pdfMatricula(){
    await this.sleep(1000);

    let d = new Date();
    let n = d.toLocaleDateString();
    
    let doc = new jsPDF({
      orientation: 'landscape'
    })
    
    doc.addImage(`${this.imgpdf.src}`, 'PNG', 180, 15, 100, 20);
    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.setFontSize(20);
    doc.text(`Circuito ${this.matCircuit}`,14,50);
    doc.setFont("courier");
    doc.setFontSize(10);
    doc.text(`${n}`,95,65);

    doc.autoTable({
      startY: 60,
      html: '#datatable5',
      });
    doc.save(`Matricula ${this.matCircuit}.pdf`);
  }

}
