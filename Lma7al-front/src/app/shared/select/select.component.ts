import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html'
})
export class SelectComponent {
  @Input() label: string = '';
  @Input() placeholder: string = 'Select an option';
  @Input() options: any[] = [];
  @Input() error: string = '';

  @Input() control:  AbstractControl<any> | null = new FormControl(); 
    
  onSelectChange(event: Event) {
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
  