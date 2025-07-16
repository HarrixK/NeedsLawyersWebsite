import { Component, OnInit, OnDestroy } from '@angular/core';
import { Language } from '../../services/language';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-features',
  standalone: false,
  templateUrl: './features.html',
  styleUrl: './features.css'
})
export class Features implements OnInit, OnDestroy {
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