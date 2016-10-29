
import {GenderEnum} from "../enums/gender.enum";
import {RoleEnum} from "../enums/roles.enum";
export class User{

    private firstName: string;
    private lastName:  string;
    private email:     string;
    private gender:    GenderEnum;
    public genderView: string;
    private role:      RoleEnum;
    public roleView:   string;
    private company:   string;

    constructor(
        firstName: string,
        lastName:  string,
        email:     string,
        gender:    GenderEnum,
        role:      RoleEnum,
        company?:  string
    ){
        this.FirstName = firstName;
        this.LastName = lastName;
        this.Email = email;
        this.Gender = gender;
        this.Role = role;
        this.Company = company;
    };

    /*Getting firstname value*/
    public get FirstName():string {
        return this.firstName;
    };

    /*Setting firstname value*/
    public set FirstName(value: string){
        this.firstName= value;
    };

    /*Getting lastname value*/
    public get LastName():string {
        return this.lastName;
    };

    /*Setting lastnname value*/
    public set LastName(value: string){
        this.lastName = value;
    };

    /*Getting firstname value*/
    public get Email():string {
        return this.email;
    };

    /*Setting firstname value*/
    public set Email(value: string){
        this.email = value;
    };

    /*Getting firstname value*/
    public get Gender():GenderEnum{
        return this.gender;
    };

    /*Setting firstname value*/
    public set Gender(value: GenderEnum){
        this.genderView = User.getGenderView(value);
        this.gender = value;
    };

    /*Getting firstname value*/
    public get Role():RoleEnum {
        return this.role;
    };

    /*Setting firstname value*/
    public set Role(value: RoleEnum) {
        this.roleView = User.getRoleView(value);
        this.role =  value;
    };

    public get Company():string{
        return this.company;
    };

    public set Company(company: string){
        this.company = company;
    };

    private static getGenderView(gender: GenderEnum):string{
        console.info(gender +" "+ GenderEnum.MALE)
        if(gender == GenderEnum.MALE) return 'Male';
        else return 'Female';
    };

    private static getRoleView(role: RoleEnum):string{
        switch (role){
            case RoleEnum.ADMIN: return 'Administrator';
            case RoleEnum.USER:  return 'User';
            case RoleEnum.ROOT:  return 'Root';
        }
    };

}

