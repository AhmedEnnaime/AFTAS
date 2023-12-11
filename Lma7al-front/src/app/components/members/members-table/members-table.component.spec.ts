import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersTableComponent } from './members-table.component';

describe('MembersTableComponent', () => {
  let component: MembersTableComponent;
  let fixture: ComponentFixture<MembersTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MembersTableComponent]
    });
    fixture = TestBed.createComponent(MembersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
