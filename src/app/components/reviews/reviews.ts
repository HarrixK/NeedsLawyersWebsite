import { Component, OnInit, HostListener } from '@angular/core';

interface Lawyer {
  id: number;
  name: string;
  location: string;
  rating: number;
  image: string;
}
@Component({
  selector: 'app-reviews',
  standalone: false,
  templateUrl: './reviews.html',
  styleUrl: './reviews.css'
})
export class Reviews {
currentSlide = 0;
  slideWidth = 0;
  cardsPerView = 4;
  
  lawyers: Lawyer[] = [
    {
      id: 1,
      name: 'خالد منصور',
      location: 'مصر',
      rating: 4.5,
      image: 'khalid.png'
    },
    {
      id: 2,
      name: 'محمد الأحمد',
      location: 'قطر',
      rating: 4.5,
      image: 'ahmed.png'
    },
    {
      id: 3,
      name: 'محمد الخوالدة',
      location: 'الأردن',
      rating: 4.5,
      image: 'khwalid.png'
    },
    {
      id: 4,
      name: 'علي مبيارك',
      location: 'السعودية',
      rating: 4.5,
      image: 'mehyar.png'
    },
    {
      id: 5,
      name: 'أحمد الشريف',
      location: 'الإمارات',
      rating: 4.5,
      image: 'ahmed.png'
    },
    {
      id: 6,
      name: 'عبدالله الكريم',
      location: 'الكويت',
      rating: 4.5,
      image: 'assets/images/lawyer6.jpg'
    }
  ];

  ngOnInit() {
    this.updateCarouselSettings();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateCarouselSettings();
  }

  updateCarouselSettings() {
    const windowWidth = window.innerWidth;
    
    if (windowWidth <= 480) {
      this.cardsPerView = 1;
    } else if (windowWidth <= 768) {
      this.cardsPerView = 2;
    } else if (windowWidth <= 1024) {
      this.cardsPerView = 3;
    } else {
      this.cardsPerView = 4;
    }
    
    // Calculate slide width based on container width and cards per view
    const containerWidth = Math.min(1200, windowWidth - 64); // max-width - padding
    this.slideWidth = containerWidth / this.cardsPerView;
  }

  get maxSlides(): number {
    return Math.max(0, this.lawyers.length - this.cardsPerView);
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
    const fullStars = Math.floor(rating);
    return Array(fullStars).fill(0);
  }
}
