import { Component, Input } from '@angular/core';
import { Member } from '../../../model/interfaces/member.model';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-members-table',
  templateUrl: './members-table.component.html',
})
export class MembersTableComponent {
  @Input() members?: Observable<Member[]>;

  constructor(
    private authService: AuthService,
    private memberService: MemberService
  ) {}

  authenticatedUserRole = this.authService.getRole();

  enableAccount(username: String | undefined) {
    this.memberService.enableAccount(username as String);
  }
}
