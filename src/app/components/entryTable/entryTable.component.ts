import {Component, Input, OnInit, Output, EventEmitter} from "@angular/core";

import {FormGroup, FormBuilder, FormControl} from "@angular/forms";

import {Router} from "@angular/router";
import {EnumsViewService} from "../../services/enumsView.service";
import {CompanyService} from "../../services/company.service";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user.model";
import {Company} from "../../models/company.model";
import {Pipe} from "@angular/core";

declare var jQuery: any;


@Pipe({
    name: "sort"
})
export class ArraySortPipe {
    transform(array: Array<string>, args: string): Array<string> {
        array.sort((a: any, b: any) => {
            if (a < b) {
                return -1;
            } else if (a > b) {
                return 1;
            } else {
                return 0;
            }
        });
        return array;
    }
}

@Component({
    selector: 'entry-table',
    templateUrl: 'entryTable.component.html'

})
export class EntryTable implements OnInit{

    @Input()
    type: string;

    @Input()
    columns: Array<Object>;

    @Input()
    table: Array<any>;

    @Input()
    sort: any;

    @Output()
    editEntryEmitter: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    addEntryEmitter: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    removeEntryEmitter:EventEmitter<any> = new EventEmitter<any>();

    formG: FormGroup;


    contentEditableValue: boolean = false;
    /*Copy companies array*/
    private copyArray: Array<any>;

    companies: Array<string>;
    workers: Array<string>;

    constructor(
        private fb: FormBuilder,
        private enumService: EnumsViewService,
        private companyService: CompanyService,
        private userService: UserService,
        private router: Router
    ){
        this.formG = fb.group({
            'filter': new FormControl(
                null , []
            )
        });


        this.formG.controls['filter'].valueChanges.
        subscribe(value =>{
            if(!this.copyArray) this.copyArray = this.table;

            if(this.type == 'user'){
                this.table = this.copyArray.filter((user)=>{
                    return (<User>user).FirstName.includes(value) || (<User>user).LastName.includes(value) || (<User>user).Email.includes(value)
                });
            }else{
                this.table = this.copyArray.filter((company)=>{
                    return company.Name.includes(value) || company.Address.includes(value);
                });
            }
        });
    };

    private refreshViewOfData():void{
        this.table.map((element)=>{
            if(this.type == 'user'){
                element['genderView']= this.enumService.getGenderView((<User>element).Gender);
                element['roleView'] = this.enumService.getRoleView((<User>element).Role)
            }
        });

    };


    ngOnInit(){
        //this.refreshViewOfData();
        if(this.type == 'user'){
            this.companies = this.companyService.getCompanies().map((company)=>{
                return company.Name;
            });
            console.info(this.companies);
        }else{


            this.companyService.getCompanies().forEach((element)=>{
                element['workers'] = [];
            });


            this.userService.Users.forEach((user)=>{
                let company: string = user.Company;
                console.info(user.FirstName +" "+user.Company);
                if(company){

                    let innerCompany: Company = this.companyService.getCompanies().filter((element)=>{
                        return element.Name == company;
                    })[0];

                    innerCompany['workers'].push(user.FirstName+ ' '+user.LastName);
                    console.info(innerCompany);

                }
            });

        }
    };

    /*Emit clicked entry to root component*/
    editEntry(entry: any):void{
        this.editEntryEmitter.emit(entry);
    };

    /*Emit clicked button to add new entry*/
    addEntry():void{
        this.addEntryEmitter.emit();
    };


    selectedEntry:any;
    openRemoveModal(entry: any):void{
        this.selectedEntry = entry;

        jQuery('#remove-modal').openModal();
    };

    removeEntry():void{
        this.removeEntryEmitter.emit(this.selectedEntry);
        this.selectedEntry = null;
    };

    openWorkerList(name: string){
        this.router.navigate(['/users', name.replace(' ', '_')]);
        console.info(name);
    };
}


