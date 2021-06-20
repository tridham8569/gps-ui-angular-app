import { Injectable } from "@angular/core";

@Injectable({
    providedIn:"root"
})
export class GPSConstans{
    static GPS_SERVER_APP_URL = "https://jaibheem.herokuapp.com/";
    //static GPS_SERVER_APP_URL = "http://localhost:8081/";
    static GPS_LOCAL_STORAGE_MEMBERS_LIST = "membersList";
    
}
