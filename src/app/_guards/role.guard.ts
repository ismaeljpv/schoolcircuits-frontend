import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import decode from 'jwt-decode';
import { AuthenticationService } from '../_services/authentication.service';
@Injectable()
export class RoleGuard implements CanActivate{
    
    constructor( private route: Router, private service: AuthenticationService){ }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        
        const Token = this.service.getToken();
         if(Token){
            const user = this.service.decodeToken();
            if(user.perfil){
                return true;
            }else{
              this.route.navigate(['/']);
              return false;
            }
         }else{
            this.route.navigate(['/']);
            return false;
         }
       
    }
}
