import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CreateAccountComponent } from './login/create-account/create-account.component';
import { AppRoutesModule } from './app.routing';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { UserLandingPageComponent } from './user-landing-page/user-landing-page.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProfileUpdateComponent } from './user-landing-page/profile-update/profile-update.component';
import { WelcomeDashboardComponent } from './user-landing-page/welcome-dashboard/welcome-dashboard.component';
import { HttpTokenInterceptor } from './user-landing-page/http-tokenInterceptor.service';
import { MemberMaintenanceComponent } from './user-landing-page/member-maintenance/member-maintenance.component';
import { MemberItemComponent } from './user-landing-page/member-maintenance/member-item/member-item.component';
import { MemberItmesListComponent } from './user-landing-page/member-maintenance/member-itmes-list/member-itmes-list.component';
import { UploadProfilePicComponent } from './user-landing-page/upload-profile-pic/upload-profile-pic.component';
import { ImageCorpperComponent } from './user-landing-page/upload-profile-pic/image-corpper/image-corpper.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateAccountComponent,
    ForgotPasswordComponent,
    UserLandingPageComponent,
    ProfileUpdateComponent,
    WelcomeDashboardComponent,
    MemberMaintenanceComponent,
    MemberItemComponent,
    MemberItmesListComponent,
    UploadProfilePicComponent,
    ImageCorpperComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    AppRoutesModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
