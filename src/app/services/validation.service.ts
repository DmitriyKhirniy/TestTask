import {Injectable} from "@angular/core";
@Injectable()
export class ValidationService{
    public  getError(key: string, currentValue?: number, required?: number):string{
        switch (key){
            case 'required':  return 'This field is required';
            case 'minlength': return 'Min length is: '+required+'. Current length is: '+currentValue;
            case 'maxlength': return 'Max length is: '+required+'. Current length is: '+currentValue;
            case 'notUniqueEmail': return 'Email should be unique';
        }
    }
};