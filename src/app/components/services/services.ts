import { Component, OnInit, OnDestroy } from '@angular/core';
import { Language } from '../../services/language';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-services',
  standalone: false,
  templateUrl: './services.html',
  styleUrl: './services.css'
})
export class Services implements OnInit, OnDestroy {
  currentLanguage: 'ar' | 'en' = 'ar';
  private languageSubscription!: Subscription;

  constructor(private languageService: Language) {}

  ngOnInit() {
    this.languageSubscription = this.languageService.currentLanguage$.subscribe(
      currentLanguage => {
        if (currentLanguage === 'ar' || currentLanguage === 'en') {
          this.currentLanguage = currentLanguage;
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