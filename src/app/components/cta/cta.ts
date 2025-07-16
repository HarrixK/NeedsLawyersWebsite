import { Component, OnInit, OnDestroy } from '@angular/core';
import { Language } from '../../services/language';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cta',
  standalone: false,
  templateUrl: './cta.html',
  styleUrl: './cta.css'
})
export class Cta implements OnInit, OnDestroy {
  language: 'ar' | 'en' = 'ar';
  private languageSubscription!: Subscription;

  constructor(private languageService: Language) {}

  ngOnInit() {
    this.languageSubscription = this.languageService.currentLanguage$.subscribe(
      currentLanguage => {
        if (currentLanguage === 'ar' || currentLanguage === 'en') {
          this.language = currentLanguage;
        }
      }
    );
  }

  ngOnDestroy() {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }
}