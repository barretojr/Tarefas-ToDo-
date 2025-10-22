import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router'; 

const appProviders = [
  provideHttpClient(),
  importProvidersFrom(ReactiveFormsModule),
  provideRouter([]) 
];


bootstrapApplication(AppComponent, { providers: appProviders })
  .catch(err => console.error(err));