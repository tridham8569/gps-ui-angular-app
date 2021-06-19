import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateAccountComponent } from "./login/create-account/create-account.component";
import { ForgotPasswordComponent } from "./login/forgot-password/forgot-password.component";
import { LoginComponent } from "./login/login.component";
import { MemberItmesListComponent } from "./user-landing-page/member-maintenance/member-itmes-list/member-itmes-list.component";
import { ProfileUpdateComponent } from "./user-landing-page/profile-update/profile-update.component";
import { ImageCorpperComponent } from "./user-landing-page/upload-profile-pic/image-corpper/image-corpper.component";
import { UploadProfilePicComponent } from "./user-landing-page/upload-profile-pic/upload-profile-pic.component";
import { UserLandingPageComponent } from "./user-landing-page/user-landing-page.component";
import { WelcomeDashboardComponent } from "./user-landing-page/welcome-dashboard/welcome-dashboard.component";

const appRoutes: Routes = [
    { path: '',redirectTo : 'login', pathMatch: 'full'},
    { path: 'login', component: LoginComponent },
    { path: 'userRegistration', component: CreateAccountComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    {
      path: ':id', component: UserLandingPageComponent, children:[
        {path:'', component: WelcomeDashboardComponent, pathMatch:'full'},
        {path:'profileUpdate', component:ProfileUpdateComponent},
        {path:'uploadProfilePic', component:UploadProfilePicComponent, children:[
          {path:'image', component: ImageCorpperComponent}
        ]},
        {path: 'allMembersList', component: MemberItmesListComponent}
      ]
    }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, { useHash: false })],
    exports: [RouterModule]
})
export class AppRoutesModule {

}