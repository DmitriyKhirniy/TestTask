export class Company{

    private name:        string;
    private address:     string;
    private phoneNumber: string;
    private site:        string;
    private description: string;

    constructor(
        _name:        string,
        _address:     string,
        _phoneNumber: string,
        _site:        string,
        _description: string
    ){
        this.Name = _name;
        this.Address = _address;
        this.PhoneNumber = _phoneNumber;
        this.WebSite = _site;
        this.Description = _description;
    };

    /*Getting name value*/
    public get Name():string {
        return this.name;
    };

    /*Setting name value*/
    public set Name(value: string){
       this.name = value;
    };

    /*Getting address value*/
    public get Address():string {
        return this.address;
    };

    /*Setting address value*/
    public set Address(value: string){
        this.address = value;
    };

    /*Getting phoneNumber value*/
    public get PhoneNumber():string {
        return this.phoneNumber;
    };

    /*Setting phoneNumber value*/
    public set PhoneNumber(value: string){
        this.phoneNumber = value;
    };

    /*Getting site value*/
    public get WebSite():string {
        return this.site;
    };

    /*Setting site value*/
    public set WebSite(value: string){
        this.site = value;
    };

    /*Getting description value*/
    public get Description():string {
        return this.description;
    };

    /*Setting description value*/
    public set Description(value: string){
        this.description = value;
    };

}