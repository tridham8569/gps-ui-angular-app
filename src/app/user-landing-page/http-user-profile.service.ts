import { HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GPSConstans } from "../gps-constants.service";
import { LoggedInUser } from "../loggedInUser.model";
import { MembersList } from "./member-maintenance/members-list.model";

@Injectable({
    providedIn: "root"
})
export class HttpUserProfileService {
    constructor(private http: HttpClient) {
    }

    updateProfileDetails(loggedInUser:LoggedInUser){
       return this.http.post
                (GPSConstans.GPS_SERVER_APP_URL+"users/"+loggedInUser.gpsUsers.userName+"/updateProfile",
                 loggedInUser.gpsUsers
                 );
    }
    
    uploadProfilePicInBody(userName:string, imageSrc:string){
        return this.http.post<any>(GPSConstans.GPS_SERVER_APP_URL+"users/"+userName+"/uploadImage", imageSrc);
     }

     getAllMemberProfiles(){
        return this.http.get<MembersList>(GPSConstans.GPS_SERVER_APP_URL+"users/allUsers");
    }

    removeProfilePic(userName:string){
        return this.http.get(GPSConstans.GPS_SERVER_APP_URL+"users/"+userName+"/removeProfilePic");
    }
}