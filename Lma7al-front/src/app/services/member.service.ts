import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class MemberService {
    private END_POINT = "localhost:8080/api/members/";
} 