import {Component, AfterViewInit} from "@angular/core";
import {FormBuilder, Validators, FormControl, FormGroup, AbstractControl} from "@angular/forms";
import {Company} from "../../models/company.model";
import {CompanyService} from "../../services/company.service";
import {User} from "../../models/user.model";

declare var jQuery: any;
declare var google: any;
@Component({
    selector: 'company-component',
    templateUrl: '/company.component.html'
})
export class CompanyComponent implements AfterViewInit{

    public myModel = ''
    public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

    /*Are fields validating*/
    private validationOn: boolean = false;
    private companyForm: FormGroup;

    options: any;
    companyColumns: Array<Object>;
    companies: Array<Company>;

    formValidate: boolean = false;

    lat: number = 30;
    lng: number = 30;
    constructor(
        private formBuilder: FormBuilder,
        private companyService: CompanyService
    ){

        this.options = {
            center: {lat: this.lat, lng: this.lng},
            zoom: 12
        };

        this.companyColumns = this.companyService.Columns;
        this.companies = this.companyService.getCompanies();

        this.companyForm = formBuilder.group({
            'name': new FormControl(
                null, [
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(30)
                ],
            ),
            'address': new FormControl(
                null, [
                    Validators.maxLength(40)
                ]
            ),
            'phoneNumber': new FormControl(
                null , [
                    Validators.minLength(7),
                    Validators.maxLength(17)
                ]
            ),
            'site': new FormControl(
                null , []
            ),
            'description': new FormControl(
                null , [
                    Validators.maxLength(400)
                ]
            )
        });

        this.companyForm.controls['name'].valueChanges.
            subscribe(value =>{
                console.info('new value is: '+value);
        });
    };

    ngAfterViewInit(){
        jQuery('#textarea1').val();
        jQuery('#textarea1').trigger('autoresize');
       // jQuery('#company-modal').leanModal();
    };
    createCompany(){
        this.formValidate = true;
        console.info('GLOABAL ERROR');
        if(this.companyForm.status == 'VALID'){
            let company: Company = new Company(
                this.companyForm.controls['name'].value,
                this.companyForm.controls['address'].value,
                this.companyForm.controls['phoneNumber'].value,
                this.companyForm.controls['site'].value,
                this.companyForm.controls['description'].value
            );
            console.info('COmpany added');
            console.info(company);
            this.companyService.addCompany(company);
            this.refreshFields();
            this.formValidate = false;
            jQuery('#company-modal').closeModal();
        }
    };

    addCompany():void{
        this.editMode = false;
        this.refreshFields();
        jQuery('#company-modal').openModal();
    };

    private refreshFields():void{
        for(let key in this.companyForm.controls){
            let validators: any = this.companyForm.controls[key].validator
          this.companyForm.controls[key].setValue(null)
        };
    };

    getErrors(control: FormControl):Array<any>{
        let errors: Array<any>= [];

        if(control['errors']){
            console.info(control['errors'])
            for(let key in control['errors']){
                console.info(key);
                errors.push(
                    this.getError(key , control['errors'][key]['actualLength'] ,control['errors'][key]['requiredLength'] )
                );
            }
            console.info(errors);
         /*   control['_errors'].forEach((error)=>{
                console.info('Error: ');
                console.info(error);
            });*/
        }

        return errors;
    };

    private getError(key: string, currentValue?: number, required?: number):string{
        switch (key){
            case 'required':  return 'This field is required';
            case 'minlength': return 'Min length is: '+required+'. Current length is: '+currentValue;
            case 'maxlength': return 'Max length is: '+required+'. Current length is: '+currentValue;
        }
    };


    overlays:any;
    ok: boolean = false;

    editingCompany: Company;
    editMode: boolean = true;

    editCompany(company: Company):void{

        this.editingCompany = company;
        this.setDataToModal(company);

        this.companyService.getGeocoding(company.Address).
            subscribe(
            (response)=>{
                console.info(response);

                this.options = {
                    center: {
                        lat:response['results'][0]['geometry']['location']['lat'] ,
                        lng: response['results'][0]['geometry']['location']['lng']
                    },
                    zoom: 12
                };


                this.overlays = [
                    new google.maps.Marker({position: {lat: response['results'][0]['geometry']['location']['lat'], lng: response['results'][0]['geometry']['location']['lng']}, title:"Konyaalti"}),
                ];

                jQuery('#company-modal').openModal();
                this.ok = true;

            },
            (error)=> console.error(error)
        );

    };

    updateCompany():void{

        let index: number = this.companyService.getCompanies().indexOf(this.editingCompany);

        let company: Company = new Company(
            this.companyForm.controls['name'].value,
            this.companyForm.controls['address'].value,
            this.companyForm.controls['phoneNumber'].value,
            this.companyForm.controls['site'].value,
            this.companyForm.controls['description'].value
        );

        this.companyService.getCompanies()[index] = company;

        this.editingCompany = null;
        this.editMode = false;

    };

    private setDataToModal(company: Company):void{
        this.editMode = true;

        console.info(company)
        for(let key in this.companyForm.controls){
            this.companyForm.controls[key].setValue(company[key]);
        };

    };

    removeCompany(company: Company):void{

        let index: number = this.companyService.getCompanies().indexOf(company);

        this.companyService.getCompanies().splice(index, 1);



    };
}
