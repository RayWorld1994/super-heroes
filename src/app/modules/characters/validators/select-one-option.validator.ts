import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function SelectOneOptionValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (typeof control.value === 'string' && control.value !== '') {
      return { optionNoSelected: true };
    }
    return null;
  };
}
