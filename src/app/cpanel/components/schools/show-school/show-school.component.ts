import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../../../services/get-data.service';
import { School } from './school';

@Component({
  selector: 'show-school',
  templateUrl: './show-school.component.html',
  styleUrls: ['./show-school.component.css']
})
export class ShowSchoolComponent implements OnInit {

  idPlantel:any;
  school = {
    "idplantel": '',
    "plantel": '',
    "codigoAdmin": '',
    "anoFundacion": '',
    "georefLatitud": '',
    "georefLongitud": '',
    "idcircuito": '',
    "direccion": '',
    "codigoEstadistico": '',
    "sige": ''
  };
  constructor(private getData: GetDataService) { }

  ngOnInit() {
    //this.school = School;
    this.getData.getSchoolId().subscribe( response =>{
      this.idPlantel = response.text;
      this.showModal(this.idPlantel);
     });
  }

  showModal(id:any){
    console.log(id);
    this.getData.getSchool(id).subscribe(
      response =>{
          console.log(response);
          this.school = {
            "idplantel": response.idplantel,
            "plantel": response.plantel,
            "codigoAdmin": response.codigoAdmin,
            "anoFundacion": response.anoFundacion,
            "georefLatitud": response.georefLatitud,
            "georefLongitud": response.georefLongitud,
            "idcircuito": response.idcircuito,
            "direccion": response.direccion,
            "codigoEstadistico": response.codigoEstadistico,
            "sige": response.sige
          };
      },
      error=>{
        console.log(error);
      }
    );
    document.getElementById('_modal').style.display = "block";
  }

  hideModal(){
    document.getElementById('_modal').style.display = "none";
  }


}
