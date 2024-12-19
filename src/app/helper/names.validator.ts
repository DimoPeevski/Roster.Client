import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export function namesValidator(): ValidatorFn {
  const regEx = new RegExp('^[A-Za-z][A-Za-z]*');

  return (control: AbstractControl): ValidationErrors | null => {
    const isValid = control.value === '' || regEx.test(control.value);

    return isValid
      ? null
      : {
          namesValidator: true,
        };
  };
}
