import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UploadedImageService } from './uploaded-image.service';

@Component({
  selector: 'app-upload-profile-pic',
  templateUrl: './upload-profile-pic.component.html',
  styleUrls: ['./upload-profile-pic.component.css']
})
export class UploadProfilePicComponent implements OnInit {

  imageSrc:string;
  profilePicUploadForm = new FormGroup({
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });

  constructor(private router:Router, private imageService:UploadedImageService) { }

  ngOnInit(): void {
  }
  onFileChange(event) {
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.imageService.uploadImage(this.imageSrc);
        this.profilePicUploadForm.patchValue({
          fileSource: reader.result
        });
        this.router.navigate(['/9177593309/uploadProfilePic/image']);
      };
    }
  }
  upload(){

  }
}
