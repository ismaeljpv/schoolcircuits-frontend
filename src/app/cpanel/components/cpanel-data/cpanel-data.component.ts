import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../../services/get-data.service';

export const prueba = [
  {titulo: 'Ingenieria', cantidad: 21},
  {titulo: 'humanidades', cantidad: 39},
  {titulo: 'otra', cantidad: 10},
  {titulo: 'general', cantidad: 14}
]


@Component({
  selector: 'app-cpanel-data',
  templateUrl: './cpanel-data.component.html',
  styleUrls: ['./cpanel-data.component.css']
})
export class CpanelDataComponent implements OnInit {

  labels:Array<any> = [];
  data:Array<any> = [];
  
  chartColors: Array<any> = [
    { backgroundColor: [
        '#dd4b39',
        '#00a65a',
        '#00c0ef',
        '#f39c12',
        '#dd4b39',
        '#00a65a',
        '#00c0ef',
        '#f39c12',
        '#dd4b39',
        '#00a65a',
        '#00c0ef',
        '#f39c12'
    ] } ];
    
    arrchartlabels:Array<any> = [];
    arrchartdata:Array<any> = [];
    pieChartOptions:Array<any> = [];
    displaychart:boolean = false;
    eventos: Array<any> = [];
    cantUser: any;
    cantCircuit: any;
    cantSchool: any;
    stadistics: Array<any> = [];

  constructor(private getData: GetDataService) { }

  ngOnInit() {
    this.getData.getStadistics().subscribe(
      response =>{
          
          this.cantCircuit = response.Circuits;
          this.cantUser = response.Users;
          this.cantSchool = response.Schools;
          for(let i of response.Events){
            let json ={
              "titulo": i.titulo,
              "contenido": i.contenido,
              "fechaEvento": this.FormatDate(i.fechaEvento) 
            }
            this.eventos.push(json);
          }
          
          this.stadistics = [
            {titulo: 'Usuarios', cantidad: parseInt(this.cantUser)},
            {titulo: 'Circuitos', cantidad: parseInt(this.cantCircuit)},
            {titulo: 'Planteles', cantidad: parseInt(this.cantSchool)}
          ];
          this.loadGraphic();
      },
      error =>{
        console.log(error);
      }
    );
    
  }
  
  loadGraphic(){
    for(let i of this.stadistics){
           
      // Nombres de las key
      this.arrchartlabels.push(i.titulo);
      // cantidades
      this.arrchartdata.push(i.cantidad);

      this.displaychart = true;
    }
  }

  FormatDate(iDate: Date) {
    let inputDate = new Date(iDate);
    let year = inputDate.getFullYear().toString();
    let month = ((inputDate.getMonth() + 1) < 10) ?  '0'+(inputDate.getMonth() + 1).toString() : (inputDate.getMonth() + 1).toString();
    var formattedDate = inputDate.getDate() +'-'+ month +'-'+ year;
    return formattedDate;
 }

}
