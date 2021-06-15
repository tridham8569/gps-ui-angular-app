import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoggedInUser } from "../loggedInUser.model";

@Injectable({
    providedIn:"root"
})
export class HttpTokenInterceptor implements HttpInterceptor{
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let loggedInUser:LoggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        if(!req.url.includes('authenticate') 
            && !req.url.includes('users/register') 
            && !req.url.includes('users/'+loggedInUser.gpsUsers.userName+'/updateProfile')){
            
            const tokenizedRequest = req.clone({
                headers:req.headers.set('Authorization', "Bearer "+loggedInUser.jwtToken)
            });
            console.log("======tokenizedRequest===");
            return next.handle(tokenizedRequest);
        }
        console.log("======req===");
        return next.handle(req);
    }

}