import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export function emailValidator(): ValidatorFn {
  const regEx = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$');

  return (control: AbstractControl): ValidationErrors | null => {
    const isValid = control.value === '' || regEx.test(control.value);

    return isValid
      ? null
      : {
          emailValidator: true,
        };
  };
}
