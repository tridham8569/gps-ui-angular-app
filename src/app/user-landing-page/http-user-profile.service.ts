import { HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GPSConstans } from "../gps-constants.service";
import { LoggedInUser } from "../loggedInUser.model";
import { MembersList } from "./member-maintenance/members-list.model";

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
    
    uploadProfilePicInBody(userName:string, imageSrc:string){
        return this.http.post<any>(this.gpsConstants.gpsServerAppUrl+"users/"+userName+"/uploadImage", imageSrc);
     }

     getAllMemberProfiles(){
        return this.http.get<MembersList>(this.gpsConstants.gpsServerAppUrl+"users/allUsers");
    }

    removeProfilePic(userName:string){
        return this.http.get(this.gpsConstants.gpsServerAppUrl+"users/"+userName+"/removeProfilePic");
    }
}