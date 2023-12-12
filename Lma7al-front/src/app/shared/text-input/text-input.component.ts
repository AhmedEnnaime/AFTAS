import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'text-input',
  template: `
    <div>
      <label *ngIf="label.length > 0" [htmlFor]="label" class="block text-sm text-gray-500 none:text-gray-300 text-left font-bold">{{ label }}</label>
      <input
        type="text"
        [placeholder]="placeholder"
        [value]="control!.value"
        (input)="onInputChange($event)"
         class="block  mt-2 w-full placeholder-gray-400/70 none:placeholder-gray-500 rounded-lg border border-blue-400 bg-white px-5 py-2.5 text-gray-700 focus:border-red-400 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-40 none:border-gray-200 none:bg-gray-900 none:text-gray-300" />
      <p *ngIf="error.length > 0"  class="mt-3 text-xs text-red-400">{{ error }}</p>
    </div>
  `
})
export class TextInputComponent {
  @Input() label: string = "";
  @Input() placeholder: string = "";
  @Input() textColor: string = "gray";
  @Input() backgroundColor: string = "white";
  @Input() error: string = "";

  @Input() control:  AbstractControl<any> | null = new FormControl();

  onInputChange(event: Event) {
    this.getControl().setValue((event.target as HTMLInputElement).value);
  }

  getControl(): FormControl {
    if (this.isFormControl(this.control)) {
      return this.control;
    } else {
      throw new Error('Control is not an instance of FormControl');
    }
  }

  getControlValue(): any {
    return this.isFormControl(this.control) ? this.control.value : '';
  }

  isFormControl(control: AbstractControl<any> | null): control is FormControl {
    return control instanceof FormControl;
  }
}
