import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { GPSConstans } from "../gps-constants.service";
import { LoggedInUserService } from "../logged-in-user.service";
import { LoggedInUser } from "../loggedInUser.model";
import { NewUser } from "./create-account/newUser.model";

@Injectable({
    providedIn: 'root'
})
export class HttpUserAuthService{

    constructor(private http:HttpClient,
                private loggedInUserService:LoggedInUserService){

    }

    login(userName:string, password:string){
    return this.http.post<any>(GPSConstans.GPS_SERVER_APP_URL+'authenticate', {
            'userName': userName,
            'password': password
          }).pipe(map(
            (responseData)=>{
              localStorage.setItem('loggedInUser', JSON.stringify(responseData));
              this.loggedInUserService.setLoggedInUser(responseData);
              return <LoggedInUser>responseData;
            }
          ));
    }

    register(newUserData: NewUser){
      return this.http.post(GPSConstans.GPS_SERVER_APP_URL+'users/register',
      newUserData);
    }
}