import { HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { GPSConstans } from "../gps-constants.service";
import { LoggedInUser } from "../loggedInUser.model";

@Injectable({
    providedIn: "root"
})
export class HttpUserProfileService {
    constructor(private http: HttpClient,
                private gpsConstants:GPSConstans) {
    }

    updateProfileDetails(loggedInUser:LoggedInUser){
       return this.http.post
                (this.gpsConstants.gpsServerAppUrl+"users/"+loggedInUser.gpsUsers.userName+"/updateProfile",
                 loggedInUser.gpsUsers
                 );
    }
}