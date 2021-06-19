import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})
export class UploadedImageService{
    image:string;

    uploadImage(image:string){
        this.image = image;
    }

    getImage(){
        return this.image;
    }
}