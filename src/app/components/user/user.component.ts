import {Component, AfterViewInit, OnInit} from "@angular/core";
import {FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms";
import {GenderEnum} from "../../enums/gender.enum";
import {RoleEnum} from "../../enums/roles.enum";
import emailMask from 'text-mask-addons/dist/emailMask.js'
import {User} from "../../models/user.model";
import {UserService} from "../../services/user.service";
import {RoleSelect} from "../../models/roleSelect.model";
import {ValidationService} from "../../services/validation.service";
import {CompanyService} from "../../services/company.service";
import {ActivatedRoute} from "@angular/router";

declare var jQuery:any;

@Component({
    selector: 'user-component',
    templateUrl: '/user.component.html',
    styleUrls: [
        '/user.component.css'
    ]
})
export class UserComponent implements OnInit,AfterViewInit{

    /*Form group variable*/
    userForm: FormGroup;

    /*if user form is validate*/
    userFormValidate: boolean = false;

    /*Can user edit data in modal*/
    editMode: boolean = false;

    /*mask form email*/
    _emailMask: any = emailMask;

    roles: Array<RoleSelect>;

    /*Array of users*/
    users: Array<User>;

    /*Columns of user table*/
    userColumns: Array<Object>;

    /*Current user that edits*/
    editingUser: User;

    /*Array of companies for editing mode select*/
    companies: Array<string>;

    constructor(
        private formBuilder: FormBuilder,
        private userService: UserService,
        private validationService: ValidationService,
        private companyService: CompanyService,
        private activeRouter: ActivatedRoute
    ){
        this.users = this.userService.Users;

        this.userColumns = this.userService.getUserTableColumns();

        this.initUserFormGroup();

        this.roles = this.userService.getRoles();

        this.companies = this.companyService.getCompanies().map((company)=>{
            return company.Name;
        });

    };


    ngOnInit(){
        /*Checking params*/
        this.activeRouter.params.subscribe(
            (params)=>{
                /*If param 'company' presented*/
                if(params['company']){
                    /*Filter user by company*/
                    let company: string = params['company'].toString().replace('_', ' ');
                    this.users = this.userService.Users.filter((user)=>{
                        return user.Company == company;
                    });
                }
            }
        );
    };

    /*Adding new user to list*/
    public addUser():void{
        /*Enable visible validation*/
        this.userFormValidate = true;

        /*if form is valid*/
        if(this.userForm.status == 'VALID'){
            /*Creating user with form fields*/
            let user: User = this.getUser();

            /*checking whether email is unique*/
            if(this.userService.isEmailValid(user.Email)){
                /*Adding new user*/
                this.userService.addUser(user);
                /*Refreshing form group*/
                this.initUserFormGroup();
                this.userFormValidate = false;
                jQuery('#modal1').closeModal();
            }else{

                /*If email not unique add error to it control*/
                this.userForm.controls['email'].setErrors(
                    {
                        notUniqueEmail: true
                    }
                );
            };
        }
    };


    /*
    * Email mask can't bind to formControlName, so it should update it manually
    * */
    emailChanged(newValue?:any):void{
        this.userForm.controls['email'].setValue(newValue);
    };

    /*Method that changes gender of user*/
    userGenderChanged(selected: boolean):void{
        /*if selected gender = MELE*/
        if(selected){
            this.userForm.controls['gender'].setValue(GenderEnum.MALE);
        }else{
            this.userForm.controls['gender'].setValue(GenderEnum.FEMALE);
        }
    };

    /*When user click on button edit*/
    editUser(user: User):void{
        this.editingUser= user;
        this.setDataToModal(user);
    };

    /*Setting user data yo form fields*/
    private setDataToModal(user: User):void{
        this.editMode = true;

        //jQuery("#role-select").val(2);
       // console.info( jQuery("#role-select").val() );

        for(let key in this.userForm.controls){
            this.userForm.controls[key].setValue(user[key]);
        };

        jQuery('#modal1').openModal();
    };


   /*Opens adding modal*/
   openAddingModal():void{
       this.editMode = false;
       this.initUserFormGroup();
       jQuery('#modal1').openModal();
   };

   /*Check errros and returns text description*/
    getErrors(control: FormControl):Array<any>{
        let errors: Array<any>= [];

        if(control['errors']){
            for(let key in control['errors']){
                errors.push(
                    this.validationService.getError(key , control['errors'][key]['actualLength'] ,control['errors'][key]['requiredLength'] )
                );
            }
        }

        return errors;
    };


    /*Updates user*/
    updateUser():void{

        /*Searching user by email(unique filed)*/
        let email:string = this.editingUser.Email;

        let searchUser: User = this.userService.Users.filter((user)=>{
            return user.Email == email;
        })[0];

        let index: number = this.userService.Users.indexOf(searchUser);

        /*getting user with form fields*/
        this.userService.Users[index] = this.getUser();

        jQuery('#modal1').closeModal();

    };

    /*Removing user from list*/
    removeUser(user:User):void{
        this.userService.Users.splice( this.userService.Users.indexOf(user, 1));
    };

    /*Init user form group*/
    private initUserFormGroup():void{
        this.userForm = this.formBuilder.group({
            'firstName': new FormControl(
                null , [
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(15)
                ]
            ),
            'lastName': new FormControl(
                null , [
                    Validators.maxLength(15)
                ]
            ),
            'email': new FormControl(
                null , [Validators.required]
            ),
            'gender': new FormControl(
                GenderEnum.MALE, [Validators.required]
            ),
            'role': new FormControl(
                RoleEnum.ADMIN , [Validators.required]
            ),
            'company': new FormControl(null, [])
        });
    };

    /*Return user entity with set fields from form*/
    private getUser():User{
        return new User(
            this.userForm.controls['firstName'].value,
            this.userForm.controls['lastName'].value,
            this.userForm.controls['email'].value,
            +this.userForm.controls['gender'].value,
            +this.userForm.controls['role'].value,
            this.userForm.controls['company'].value
        );
    };

    /*Installing material components*/
    ngAfterViewInit(){
        jQuery('.modal-trigger').leanModal();
        jQuery('select').material_select();
    };
}