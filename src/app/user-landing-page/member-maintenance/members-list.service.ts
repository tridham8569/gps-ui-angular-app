import { Injectable } from "@angular/core";
import { Member } from "./member.model";

@Injectable({
    providedIn:'root'
})
export class MembersListService{
    membersList:Member[];
    loadTime:Date;

    setMembersList(membersList:Member[], loadTime:Date){
        this.membersList = membersList;
        this.loadTime = loadTime;
    }

    getMembersList(){
        return this.membersList;
    }

    getLoadTime():Date{
        return this.loadTime;
    }
}