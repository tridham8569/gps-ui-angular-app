import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { GPSConstans } from "../gps-constants.service";
import { LoggedInUser } from "../loggedInUser.model";
import { NewUser } from "./create-account/newUser.model";

@Injectable({
    providedIn: 'root'
})
export class HttpUserAuthService{

    constructor(private http:HttpClient,
                private gpsConstants:GPSConstans){

    }

    login(userName:string, password:string){
    return this.http.post<any>(this.gpsConstants.gpsServerAppUrl+'authenticate', {
            'userName': userName,
            'password': password
          }).pipe(map(
            (responseData)=>{
              localStorage.setItem('loggedInUser', JSON.stringify(responseData));
              if(responseData.gpsUsers.profilePic !== undefined){
                localStorage.setItem('LoggedInUserProfilePic',"data:image/jpeg;base64,"+responseData.gpsUsers.profilePic.data);
              }
              return <LoggedInUser>responseData;
            }
          ));
    }

    register(newUserData: NewUser){
      return this.http.post(this.gpsConstants.gpsServerAppUrl+'users/register',
      newUserData);
    }
}