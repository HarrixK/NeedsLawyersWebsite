import { Component, OnInit, OnDestroy } from '@angular/core';
import { Language } from '../../services/language';
import { translations } from '../../services/translations';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer implements OnInit, OnDestroy {
  currentLanguage: string = 'ar';
  translations = translations;
  private languageSubscription!: Subscription;

  constructor(private languageService: Language) {}

  ngOnInit() {
    this.languageSubscription = this.languageService.currentLanguage$.subscribe(
      language => {
        this.currentLanguage = language;
      }
    );
  }

  ngOnDestroy() {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }
}