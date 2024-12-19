import { Directive } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { namesValidator } from '../helper/names.validator';

@Directive({
  selector: '[appName]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: NamesDirective,
    },
  ],
})
export class NamesDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return namesValidator()(control);
  }
}
