import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-date-picker',
  template: `
    <div>
      <label *ngIf="label.length > 0" [for]="label" class="block text-left text-sm text-gray-500 none:text-gray-300 font-bold">{{ label }}</label>
        <input
          type="date"
          [value]="control"
          (input)="onInputChange($event)"
          class="block w-full mt-2 rounded-lg border border-gray-300 none:border-gray-700 bg-white none:bg-gray-900 px-5 py-2.5 text-gray-700 none:text-gray-300 focus:border-red-400 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-40 transition-all duration-200"
        />
      <p *ngIf="error.length > 0" class="mt-3 text-xs text-red-400">{{ error }}</p>
    </div>
  `,
})
export class DatePickerComponent {
  @Input() label: string = '';
  @Input() error: string = '';
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
