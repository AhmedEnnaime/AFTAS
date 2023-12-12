import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingsPageComponent } from './rankings-page.component';

describe('RankingsPageComponent', () => {
  let component: RankingsPageComponent;
  let fixture: ComponentFixture<RankingsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RankingsPageComponent]
    });
    fixture = TestBed.createComponent(RankingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
