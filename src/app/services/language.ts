import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Language {
  private currentLanguageSubject = new BehaviorSubject<string>('ar');
  public currentLanguage$ = this.currentLanguageSubject.asObservable();

  constructor() {
    // Check if language is stored in localStorage
    const savedLanguage = localStorage.getItem('language') || 'ar';
    this.setLanguage(savedLanguage);
  }

  setLanguage(language: string) {
    this.currentLanguageSubject.next(language);
    localStorage.setItem('language', language);
    document.documentElement.setAttribute('lang', language);
    document.documentElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
  }

  getCurrentLanguage(): string {
    return this.currentLanguageSubject.value;
  }

  toggleLanguage() {
    const newLanguage = this.getCurrentLanguage() === 'ar' ? 'en' : 'ar';
    this.setLanguage(newLanguage);
  }
}