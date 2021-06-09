import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateAccountComponent } from "./login/create-account/create-account.component";
import { ForgotPasswordComponent } from "./login/forgot-password/forgot-password.component";
import { LoginComponent } from "./login/login.component";

const appRoutes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'userRegistration', component: CreateAccountComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, { useHash: false })],
    exports: [RouterModule]
})
export class AppRoutesModule {

}