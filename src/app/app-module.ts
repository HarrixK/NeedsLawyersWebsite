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
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Cta } from './components/cta/cta';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrivacyPolicy } from './components/privacy-policy/privacy-policy';
import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';
import { AppRoutingModule } from './app-routing-module';
import { Layout } from './layout/layout';
import { Home } from './components/home/home';
import { HttpClient, HttpClientModule } from '@angular/common/http';

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
    Cta,
    PrivacyPolicy,
    TermsAndConditionsComponent,
    Layout,
    Home,
  ],
  imports: [
    BrowserModule,
    NgOptimizedImage,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
