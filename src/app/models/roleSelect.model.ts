import {RoleEnum} from "../enums/roles.enum";
export class RoleSelect{
    constructor(
        public display: string,
        public value: RoleEnum
    ){};
}