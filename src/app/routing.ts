import {RouterModule} from "@angular/router";
import {UserComponent} from "./components/user/user.component";
import {CompanyComponent} from "./components/company/company.component";
import {NgModule} from "@angular/core";
@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '',
                redirectTo: '/users',
                pathMatch: 'full'
            },
            { path: 'users', component: UserComponent},
            { path: 'users/:company', component: UserComponent},
            { path: 'companies', component: CompanyComponent },
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}