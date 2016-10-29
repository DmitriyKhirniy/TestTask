import {Injectable} from "@angular/core";
import {Company} from "../models/company.model";
import {Http, URLSearchParams} from "@angular/http";
import 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CompanyService{

    private companies: Array<Company>;
    private companyColumns: Array<Object>;

    constructor(
        private http: Http
    ){
        this.companies =  [
            new Company(
                'Fargo Inc.',
                '4102 Melrose Avenue , Los Angeles',
                '+3809745678',
                'www.fargo.com',
                'The best company'
            ),
            new Company(
                'Audi Inc.',
                'Дегтярівська, 54, Київ',
                '+3809745678',
                'www.audi.com.ua',
                'The best company'
            )
        ];

        this.companyColumns = [
            {
                display: 'Name', //The text to display
                variable: 'Name', //The name of the key that's apart of the data array
                filter: 'text' ,//The type data type of the column (number, text, date, etc.)
            },
            {
                display: 'Address', //The text to display
                variable: 'Address', //The name of the key that's apart of the data array
                filter: 'text' ,//The type data type of the column (number, text, date, etc.)
            },
            {
                display: 'Phone number', //The text to display
                variable: 'PhoneNumber', //The name of the key that's apart of the data array
                filter: 'text' ,//The type data type of the column (number, text, date, etc.)
            },
            {
                display: 'Website', //The text to display
                variable: 'WebSite', //The name of the key that's apart of the data array
                filter: 'text' ,//The type data type of the column (number, text, date, etc.)
            },
            {
                display: 'Description', //The text to display
                variable: 'Description', //The name of the key that's apart of the data array
                filter: 'text' ,//The type data type of the column (number, text, date, etc.)
            }
        ];
    };

    public getCompanies():Array<Company>{
        return this.companies;
    };

    public addCompany(company: Company):void{
        this.companies.push(company);
    };

    public get Columns():Array<Object>{
        return this.companyColumns;
    };

    public getGeocoding(address: string): any{
        const url: string = 'https://maps.googleapis.com/maps/api/geocode/json';

        console.info(address);
        const params = new URLSearchParams();
        params.set('address' , address.toString());
        params.set('key' , 'AIzaSyDZ-VaWEjQbT64fZtb80JfOzJvH6KPcbH0');
        return this.http.get(url , {search: params})
            .map(res => res.json())

    };
}