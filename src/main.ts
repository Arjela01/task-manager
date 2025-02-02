import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { ApplicationConfig } from '@angular/core';

bootstrapApplication(AppComponent, appConfig as ApplicationConfig).catch(
  (err) => console.error(err)
);
