import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class MemberService {
    private baseUrl: string = "http://localhost:9090/api/members/";

} 