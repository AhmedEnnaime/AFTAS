import { NgModule } from "@angular/core";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { PopupFormComponent } from "./pop-up/popup-form.component";
import { TextInputComponent } from "./text-input/text-input.component";
import { ButtonComponent } from "./button/button.component";
import { CommonModule } from "@angular/common";
import { SelectComponent } from "./select/select.component";
import { DatePickerComponent } from "./date-picker/date-picker.component";
import { TimePickerComponent } from "./time-picker/time-picker.component";
import { NumberInputComponent } from "./number-input/number-input.component";

@NgModule({
    declarations: [PopupFormComponent, TextInputComponent, ButtonComponent, SelectComponent, DatePickerComponent, TimePickerComponent, NumberInputComponent],
    imports: [
      CommonModule,
      FontAwesomeModule,
    ],
    exports: [PopupFormComponent, TextInputComponent, ButtonComponent, SelectComponent, DatePickerComponent, TimePickerComponent, NumberInputComponent]
  })
  export class SahredModule {}