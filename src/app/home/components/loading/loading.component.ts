import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  showLoader() {
    (document.getElementById('background_loader') as HTMLDivElement).style.display = 'block';
  }
  
  // Función para esconder el componente de carga
  hideLoader() {
    (document.getElementById('background_loader') as HTMLDivElement).style.display = 'none';
  }

}
