import {Injectable} from "@angular/core";
import {User} from "../models/user.model";
import {GenderEnum} from "../enums/gender.enum";
import {RoleEnum} from "../enums/roles.enum";
import {RoleSelect} from "../models/roleSelect.model";
@Injectable()
export class UserService{

    private users: Array<User>;
    private columns: Array<Object>;

    constructor(){
        this.users = [
            new User(
                'John',
                'Mitchel',
                'johnmitchel@gmail.com',
                GenderEnum.MALE,
                RoleEnum.ADMIN,
                'Audi Inc.'
            ),
            new User(
                'Artrur',
                'Babaev',
                'arturbabaev@gmail.com',
                GenderEnum.FEMALE,
                RoleEnum.USER,
                'Fargo Inc.'
            )
        ];

        this.columns = [
            {
                display: 'First name', //The text to display
                variable: 'FirstName', //The name of the key that's apart of the data array
                filter: 'text' ,//The type data type of the column (number, text, date, etc.)
            },
            {
                display: 'Last name', //The text to display
                variable: 'LastName', //The name of the key that's apart of the data array
                filter: 'text' ,//The type data type of the column (number, text, date, etc.)
            },
            {
                display: 'Email', //The text to display
                variable: 'Email', //The name of the key that's apart of the data array
                filter: 'text' ,//The type data type of the column (number, text, date, etc.)
            },
            {
                display: 'Gender', //The text to display
                variable: 'genderView', //The name of the key that's apart of the data array
                filter: 'text' ,//The type data type of the column (number, text, date, etc.)
            },
            {
                display: 'Role', //The text to display
                variable: 'roleView', //The name of the key that's apart of the data array
                filter: 'text' ,//The type data type of the column (number, text, date, etc.)
            },
        ];
    };

    public get Users():Array<User>{
        return this.users;
    };

    public addUser(user: User):void{
        this.users.push(user);
    };

    public getUserTableColumns():Array<Object>{
        return this.columns;
    };

    public getRoles():Array<RoleSelect>{
        return [
            new RoleSelect('Administrator', RoleEnum.ADMIN),
            new RoleSelect('User', RoleEnum.USER),
            new RoleSelect('Root', RoleEnum.ROOT)
        ];
    };

    public isEmailValid(email: string):boolean{
        console.info('CHECKING: '+email);
        let valid: boolean = true;
        this.Users.forEach((user)=>{
            console.info(email ==user.Email);
            if(email == user.Email){
                valid =  false;
                return;
            }
        });
        return valid;
    };

}