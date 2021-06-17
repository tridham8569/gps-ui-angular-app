import { Injectable } from "@angular/core";

@Injectable({
    providedIn:"root"
})
export class GPSConstans{
    gpsServerAppUrl:string = "https://jaibheem.herokuapp.com/";
    //gpsServerAppUrl:string = "http://localhost:8081/";
}
