import {Injectable} from "@angular/core";
import {GenderEnum} from "../enums/gender.enum";
import {RoleEnum} from "../enums/roles.enum";
@Injectable()
export class EnumsViewService{

    /*Method returns view of gender enum*/
    public getGenderView(gender: GenderEnum):string{
        console.info(gender +" "+ GenderEnum.MALE)
        if(gender == GenderEnum.MALE) return 'Male';
        else return 'Female';
    };

    public getRoleView(role: RoleEnum):string{
        switch (role){
            case RoleEnum.ADMIN: return 'Administrator';
            case RoleEnum.USER:  return 'User';
            case RoleEnum.ROOT:  return 'Root';
        }
    };

}