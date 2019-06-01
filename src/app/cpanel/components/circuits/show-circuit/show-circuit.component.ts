import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetDataService } from '../../../services/get-data.service'; 

@Component({
  selector: 'show-circuit',
  templateUrl: './show-circuit.component.html',
  styleUrls: ['./show-circuit.component.css']
})
export class ShowCircuitComponent implements OnInit {
  circuit = {
    "idcircuito": '',
    "nro": '',
    "circuito": '',
    "codigo": '',
    "puntoycirculo": '',
    "nro_planteles": '',
    "municipio": '',
    "supervisor": '',
    "estado": '',
    "parroquia": ''
  };
  idCircuit: any;
  blobimg: any;
  previewimg: any;
  image: HTMLImageElement;
  constructor(private getData : GetDataService) { }

  ngOnInit() {
    this.getData.getCircuitId().subscribe( response =>{
      this.idCircuit = response.text;
      this.showModal(this.idCircuit);
     });
  }

  hideModal(){
    document.getElementById('_modal').style.display = "none";
  }

  showModal(id:any){
    console.log(id);
    this.getData.getCircuit(id).subscribe(
      response => {
        console.log(response);
        this.circuit = {
            "idcircuito": response.Circuit.idcircuito,
            "nro": response.Circuit.nro,
            "circuito": response.Circuit.nombrecircuital,
            "codigo": response.Circuit.codigoCircuital,
            "puntoycirculo": response.Circuit.puntoycirculo,
            "nro_planteles": response.Circuit.nroplanteles,
            "municipio": response.Circuit.municipio,
            "estado": response.Circuit.estado,
            "parroquia": response.Circuit.parroquia,
            "supervisor": response.Person.nombre1 +" "+ response.Person.apellido1 +" / CI:"+ response.Person.cedula
        }
        this.previewimg = document.getElementById('preview');
        this.image = document.createElement('img');
        this.image.src =  response.Circuit.imagenGeoref;
        this.image.style.height = 190+"px";
        this.previewimg.innerHTML = '';
        this.previewimg.append(this.image);

        console.log(this.circuit);
      },
      error => {
       console.log(error);
      }
    );
    document.getElementById('_modal').style.display = "block";
  }

}
