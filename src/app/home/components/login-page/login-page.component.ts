import { Component, OnInit } from '@angular/core';
import { Router,  ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { AuthenticationService } from '../../../_services/authentication.service';
import { LoadingComponent } from '../loading/loading.component'; 
import swal from 'sweetalert2';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm : FormGroup;
  loader = new LoadingComponent();
  returnUrl: string;
  type:string = "password";

  constructor(
    private formbuilder: FormBuilder, 
    private router: Router,
    private loginservice: AuthenticationService,
    private route: ActivatedRoute){ 
  }


  ngOnInit() {
    this.loginForm = this.formbuilder.group({
      nombreusuario: ['', Validators.required],
      clave: ['', Validators.required]
    });

   }

   showPsw() {
    if(this.type === "password") {
      this.type = "text";
    }
    else {
      this.type = "password";
    }
  }


  PostData(login: FormGroup){
    
    var _jsn = {
      "nombreusuario": login.controls['nombreusuario'].value,
      "clave": login.controls['clave'].value
    }

    console.log(JSON.stringify(_jsn));
    this.loader.showLoader();
    this.loginservice.login(JSON.stringify(_jsn)).subscribe(
      response => {
        this.loader.hideLoader();
        this.loginservice.saveToken(response.body['Authorization']);
        let role = this.loginservice.decodeToken();

        if(role.perfil){
          this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
        }else{
          this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/login';
        }
        
        this.router.navigate([this.returnUrl]);
      },
      error => {
        this.loader.hideLoader();
        swal.fire({
          type: 'error',
          title: 'Ha ocurrido un error!',
        })
      }
    );

  }


}
