import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {CompanyComponent} from "./components/company/company.component";
import {FormBuilder, ReactiveFormsModule, FormsModule} from "@angular/forms";
import {CompanyService} from "./services/company.service";
import {UserService} from "./services/user.service";
import {TextMaskModule} from "angular2-text-mask";
import {UserComponent} from "./components/user/user.component";
import {AppRoutingModule} from "./routing";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import {EnumsViewService} from "./services/enumsView.service";
import {ValidationService} from "./services/validation.service";
import {HttpModule} from "@angular/http";
import {GMapModule} from "primeng/components/gmap/gmap";
import {EntryTable} from "./components/entryTable/entryTable.component";


@NgModule({
  imports: [
      BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    FormsModule,
    TextMaskModule,
    AppRoutingModule,
      GMapModule
  ],
  providers: [
      FormBuilder,
    CompanyService, UserService ,
      EnumsViewService,
      ValidationService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
    ],
  declarations: [
      AppComponent,
    CompanyComponent,
    EntryTable,
    UserComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
