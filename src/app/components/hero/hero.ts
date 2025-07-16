import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { Language } from '../../services/language';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-hero',
  standalone: false,
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})
export class Hero implements OnInit, OnDestroy {
  isLoading = signal(false);
  currentSlide = signal(0);
  language: 'ar' | 'en' = 'ar';
  lawyers: any[] = [];
  private languageSubscription!: Subscription

  constructor(
    private languageService: Language
  ) {}

  ngOnInit() {
    this.languageSubscription = this.languageService.currentLanguage$.subscribe(
      currentLanguage => {
        if (currentLanguage === 'ar' || currentLanguage === 'en') {
          this.language = currentLanguage;
          this.updateLawyers();
        }
      }
    );
  }

  ngOnDestroy() {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }

  nextSlide() {
    this.currentSlide.update(current => 
      current === this.lawyers.length - 1 ? 0 : current + 1
    );
  }

  previousSlide() {
    this.currentSlide.update(current => 
      current === 0 ? this.lawyers.length - 1 : current - 1
    );
  }

  private updateLawyers() {
    this.lawyers = [
      {
        name: this.language === 'ar' ? 'أحمد محمد' : 'Ahmed Mohammed',
        specialty: this.language === 'ar' ? 'محامي قانون تجاري' : 'Commercial Law Lawyer',
        image: 'khalid.png',
        rating: '4.9'
      },
      {
        name: this.language === 'ar' ? 'فاطمة علي' : 'Fatima Ali',
        specialty: this.language === 'ar' ? 'محامية أحوال شخصية' : 'Family Law Lawyer',
        image: 'ahmed.png',
        rating: '4.8'
      },
      {
        name: this.language === 'ar' ? 'محمد السالم' : 'Mohammed Al-Salem',
        specialty: this.language === 'ar' ? 'محامي قانون جنائي' : 'Criminal Law Lawyer',
        image: 'khalid.png',
        rating: '4.7'
      },
      {
        name: this.language === 'ar' ? 'سارة أحمد' : 'Sarah Ahmed',
        specialty: this.language === 'ar' ? 'محامية قانون عقاري' : 'Real Estate Law Lawyer',
        image: 'khwalid.png',
        rating: '4.9'
      }
    ];
  }
}