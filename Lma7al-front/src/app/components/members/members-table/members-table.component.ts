import { Component, Input } from '@angular/core';
import { Member } from '../../../model/interfaces/member.model';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { MemberService } from 'src/app/services/member.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-members-table',
  templateUrl: './members-table.component.html',
})
export class MembersTableComponent {
  @Input() members?: Observable<Member[]>;

  constructor(
    private authService: AuthService,
    private memberService: MemberService,
    private router: Router
  ) {}

  authenticatedUserRole = this.authService.getRole();

  fg: FormGroup = new FormGroup({
    role: new FormControl(''),
  });

  enableAccount(username: String | undefined) {
    this.memberService
      .enableAccount(username as String)
      .subscribe((response) => {
        console.log(response);
        this.router.navigate(['/members']);
      });
  }

  upgradeAccount(username: String | undefined) {
    this.memberService
      .upgradeRole(this.fg.getRawValue().role, username as String)
      .subscribe((response) => {
        console.log(response);
        this.router.navigate(['/members']);
      });
  }
}
