import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PostDataService } from '../../../services/post-data.service';
import swal from 'sweetalert2'; 

@Component({
  selector: 'app-add-evidence',
  templateUrl: './add-evidence.component.html',
  styleUrls: ['./add-evidence.component.css']
})
export class AddEvidenceComponent implements OnInit {

  id:any;
  addEvidenceForm: FormGroup;
  blobimg: any;
  previewimg: any;
  image: HTMLImageElement;

  constructor(private formBuilder: FormBuilder, public route: ActivatedRoute, private postPhoto: PostDataService) { 
    this.addEvidenceForm = formBuilder.group({
      observaciones: ['', Validators.required],
      foto: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
    });
    this.previewimg = document.getElementById('preview');
    this.image = document.createElement('img');
    this.image.src =  '';
    this.image.style.height = 190+"px";
    this.previewimg.innerHTML = '';
    this.previewimg.append(this.image);
  }

  getimg(event){
    if(event.target.value === ""){
      this.blobimg = '';
    }else{
    console.log(event.target.files);
    let file = event.target.files;
    var reader = new FileReader();
    reader.onload = this.toblob.bind(this);
    reader.readAsBinaryString(file[0]);
    }
  
  }

  

  toblob(readerEvent){
    let binaryString = readerEvent.target.result;
     this.blobimg = "data:image/jpeg;base64," + btoa(binaryString);
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
   }


  postData(form: FormGroup){
    let _jsn = {
  
      'observaciones': form.controls['observaciones'].value,
      'foto': this.blobimg,
      'idplan': parseInt(this.id)
    }

    this.postPhoto.postPhotos(_jsn).subscribe(
      response =>{
        swal.fire({
          type: 'success',
          title: 'Se ha guardado correctamente!',
        })
        this.addEvidenceForm.reset();
      },
      error =>{
        swal.fire({
          type: 'error',
          title: 'Ha ocurrido un error!',
        })
      }
    );

  }

}
