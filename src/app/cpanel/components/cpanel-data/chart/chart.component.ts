import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  @Input() tittle: string;
  @Input()  labels: Array<any> = [];
  @Input()  data: Array<any> = [];
  @Input()  type: string;
  @Input()  options: Array<any> = [];
  @Input()  colors: Array<any> = [];
  position: string = 'left';
  


  constructor() { }

  ngOnInit() {
  }

  // events on slice click
  public chartClicked(e:any):void {
    console.log(e);
  }

  // event on pie chart slice hover
  public chartHovered(e:any):void {
    console.log(e);
  }


}
