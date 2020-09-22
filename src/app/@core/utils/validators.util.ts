import { FormArray, FormGroup } from '@angular/forms';
import * as moment from 'moment'
export function MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {            
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}

export function MustAfter(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails

        if (moment(control.value).isBefore(moment(matchingControl.value))) {            
            matchingControl.setErrors(null);
        } else {
            matchingControl.setErrors({ mustAfter: true });
            
        }
    }
}

export function AtleastOneValidator(arr:FormArray){
    let validCount = 0;
    arr.controls.forEach((form:FormGroup)=>{
      
      if(!form.invalid){
        let isFormBlank = false;
        Object.keys(form.controls).forEach(key => {
          if(form.get(key).value == '' && key !='photo' && key !='photoSource'){
            isFormBlank = true;          
          }
        });
        if(!isFormBlank) validCount++;
      }
        
    })
    return validCount >= 1 ? {atLeastOne:false} : {atLeastOne:true}
  }