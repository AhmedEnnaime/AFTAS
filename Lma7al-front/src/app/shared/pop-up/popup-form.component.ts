import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'popup',
    templateUrl: './popup-form.component.html',
})
export class PopupFormComponent {
  isOpen: boolean = false;
  @Input() title: string = "title";
  @Input() description: string = "description";
  @Input() submitText: string = "submit";
  faTimes = faTimes;

  @Output() submit: EventEmitter<void> = new EventEmitter();

  Onsubmit() {
    this.submit.emit();
  }

  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }

}
