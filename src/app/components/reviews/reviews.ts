import { Component, OnInit, OnDestroy } from '@angular/core';
import { Language } from '../../services/language';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reviews',
  standalone: false,
  templateUrl: './reviews.html',
  styleUrl: './reviews.css'
})
export class Reviews implements OnInit, OnDestroy {
  language: 'ar' | 'en' = 'ar';
  currentSlide = 0;
  slideWidth = 320;
  maxSlides = 0;
  lawyers: any[] = [];
  private languageSubscription!: Subscription;

  constructor(private languageService: Language) {}

  ngOnInit() {
    this.languageSubscription = this.languageService.currentLanguage$.subscribe(
      currentLanguage => {
        if (currentLanguage === 'ar' || currentLanguage === 'en') {
          this.language = currentLanguage;
          this.currentSlide = 0; // Reset slide when language changes
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

  private updateLawyers() {
    this.lawyers = [
      {
        id: 1,
        name: this.language === 'ar' ? 'خالد منصور' : 'Khalid Mansour',
        location: this.language === 'ar' ? 'مصر' : 'Egypt',
        rating: 4.5,
        image: 'khalid.png'
      },
      {
        id: 2,
        name: this.language === 'ar' ? 'محمد الأحمد' : 'Mohammed Al-Ahmad',
        location: this.language === 'ar' ? 'قطر' : 'Qatar',
        rating: 4.5,
        image: 'ahmed.png'
      },
      {
        id: 3,
        name: this.language === 'ar' ? 'محمد الخوالدة' : 'Mohammed Al-Khawaldeh',
        location: this.language === 'ar' ? 'الأردن' : 'Jordan',
        rating: 4.5,
        image: 'khwalid.png'
      },
      {
        id: 4,
        name: this.language === 'ar' ? 'علي مبيارك' : 'Ali Mubarak',
        location: this.language === 'ar' ? 'السعودية' : 'Saudi Arabia',
        rating: 4.5,
        image: 'mehyar.png'
      },
      {
        id: 5,
        name: this.language === 'ar' ? 'أحمد الشريف' : 'Ahmed Al-Sharif',
        location: this.language === 'ar' ? 'الإمارات' : 'UAE',
        rating: 4.5,
        image: 'ahmed.png'
      },
      {
        id: 6,
        name: this.language === 'ar' ? 'عبدالله الكريم' : 'Abdullah Al-Karim',
        location: this.language === 'ar' ? 'الكويت' : 'Kuwait',
        rating: 4.5,
        image: 'assets/images/lawyer6.jpg'
      }
    ];
    
    // Calculate max slides (show 3 cards at a time)
    this.maxSlides = Math.max(0, this.lawyers.length - 3);
  }

  getTransform(): string {
    if (this.language === 'ar') {
      // For RTL, we need to move in the opposite direction
      return `translateX(${this.currentSlide * this.slideWidth}px)`;
    } else {
      // For LTR, normal direction
      return `translateX(${-this.currentSlide * this.slideWidth}px)`;
    }
  }

  nextSlide() {
    if (this.currentSlide < this.maxSlides) {
      this.currentSlide++;
    }
  }

  previousSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    }
  }

  getStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }
}