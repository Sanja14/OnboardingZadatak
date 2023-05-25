// TEMPLATE
import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { DateFnsAdapter, MatDateFnsModule } from '@angular/material-date-fns-adapter'
import { enUS } from 'date-fns/locale';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faClose, faPen, faSave, faSearch, faStar, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faImage, faCalendar } from '@fortawesome/free-regular-svg-icons';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// export const CONFIG_TOKEN: InjectionToken<Config> = new InjectionToken<Config>("CONFIG_TOKEN");

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    MatDatepickerModule,
    MatDateFnsModule,
    MatButtonModule,
    MatInputModule,
  ],
  providers: [
    // {
    //   provide: CONFIG_TOKEN,
    //   useValue: {
    //     actorsAPI: "http://localhost:8089/actors",
    //     moviesAPI: "http://localhost:8090/movies",
    //     genresAPI: "http://localhost:8091/genres"
    //   }
    // },
    {
      provide: DateAdapter,
      useClass: DateFnsAdapter
    },
    {
      provide: MAT_DATE_LOCALE,
      useValue: enUS
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: 'yyyy-MM-dd'
        },
        display: {
          dateInput: 'yyyy-MM-dd',
          monthYearLabel: 'MMM yyyy',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM yyyy',
        }
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(iconLibrary: FaIconLibrary) {
    iconLibrary.addIcons(faPen, faStar, faTrash, faSave, faClose, faSearch, faCalendar, faImage)
  }
}