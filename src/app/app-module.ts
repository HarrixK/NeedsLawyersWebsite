import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { App } from './app';
import { Header } from './components/header/header';
import { Hero } from './components/hero/hero';
import { Features } from './components/features/features';
import { Services } from './components/services/services';
import { Reviews } from './components/reviews/reviews';
import { ContactUs } from './components/contact-us/contact-us';
import { Footer } from './components/footer/footer';
import { NgOptimizedImage } from '@angular/common';
import { Cta } from './components/cta/cta';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    App,
    Header,
    Hero,
    Features,
    Services,
    Reviews,
    ContactUs,
    Footer,
    Cta
  ],
  imports: [
    BrowserModule,
    NgOptimizedImage,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
