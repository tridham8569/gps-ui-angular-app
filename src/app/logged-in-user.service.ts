import { Injectable } from "@angular/core"
import { Subject } from "rxjs";
import { LoggedInUser } from "./loggedInUser.model";

@Injectable({
    providedIn: 'root'
})
export class LoggedInUserService {
    loggedInUserSubject = new Subject<LoggedInUser>();

    private loggedInUser: LoggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    setLoggedInUser(loggedInUser: LoggedInUser) {
        this.loggedInUser = loggedInUser;
        this.loggedInUserSubject.next(this.loggedInUser);
    }

    getLoggedInUser() {
        return this.loggedInUser;
    }
}