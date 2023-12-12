import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import * as fishPageActions from "../../store/fish/actions/fish-page.actions";
import * as huntingPageActions from "../../store/hunting/actions/hunting-page.actions";
import {Hunting} from "../../model/interfaces/hunting";
import {Store} from "@ngrx/store";
import {Fish} from "../../model/interfaces/fish";
import {selectFishes} from "../../store/fish/fish.selectors";
import {Observable} from "rxjs";

@Component({
  selector: 'app-hunting',
  templateUrl: './hunting.component.html',
  styleUrls: ['./hunting.component.css']
})
export class HuntingComponent implements OnInit{
  @Input() memberNum?: number
  huntForm: FormGroup
  competitionCode?: string;
  fishes: Observable<Fish[]>

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private store: Store) {
    this.fishes = store.select(selectFishes)
    this.huntForm = this.fb.group({
      fish_name: ['', Validators.required],
      competition_code: [this.competitionCode, Validators.required],
      member_num: [this.memberNum, Validators.required],
      numberOfFish: [1, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.competitionCode = params.get('id') ?? '';
    });
    this.store.dispatch(fishPageActions.enter());
  }

  addHunt() {
    const hunting: Hunting = this.huntForm.value as Hunting;
    this.store.dispatch(huntingPageActions.addHunting({hunting}));
  }
}
