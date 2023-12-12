import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'btn',
  template: `
    <button
      class="flex items-center justify-center w-full  px-5 py-2 text-sm font-medium tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg focus:outline-none focus:ring focus:border-blue-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600"
      [disabled]="isDisabled"
      type="button"
      (click)="btnClicked()"
    >
      <ng-content></ng-content>
      <span class="ml-2">{{ text }}</span>
    </button>

  `
})
export class ButtonComponent {
  @Input() text: string = "button";
  @Input() color: string = "blue";
  @Input() isDisabled: boolean = false;

  @Output() btnClick: EventEmitter<void> = new EventEmitter<void>();

  btnClicked(): void {
    this.btnClick.emit();
  }
}
