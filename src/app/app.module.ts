import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { SharedService } from './services/shared.service';
import { HomeComponent } from './home/home.component';
import { PraticienComponent } from './praticien/praticien.component';
import { PratListComponent } from './prat-list/prat-list.component';
import { PraticiensComponent } from './praticiens/praticiens.component';
import { LoginService } from './services/login.service';
import { HttpClientModule } from '@angular/common/http';
import { ErrorComponent } from './error/error.component';
import { PraticienService } from './services/praticien.service';
import { PossederComponent } from './posseder/posseder.component';
import { PossederService } from './services/posseder.service';
import { SpecialiteComponent } from './specialite/specialite.component';
import { SpecialiteService } from './services/specialite.service';
import { PratBySpecComponent } from './prat-by-spec/prat-by-spec.component';
import { PratByNameComponent } from './prat-by-name/prat-by-name.component';
import { PratSpecsListComponent } from './prat-specs-list/prat-specs-list.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LoginComponent,
    HomeComponent,
    PraticienComponent,
    PratListComponent,
    PraticiensComponent,
    ErrorComponent,
    PossederComponent,
    SpecialiteComponent,
    PratBySpecComponent,
    PratByNameComponent,
    PratSpecsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [SharedService, LoginService, PraticienService, PossederService, SpecialiteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
