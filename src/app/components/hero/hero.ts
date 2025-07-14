import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: false,
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})
export class Hero {
  isLoading = signal(false);
  currentSlide = signal(0);
  
  lawyers = [
    {
      name: 'أحمد محمد',
      specialty: 'محامي قانون تجاري',
      image: 'khalid.png',
      rating: '4.9'
    },
    {
      name: 'فاطمة علي',
      specialty: 'محامية أحوال شخصية',
      image: 'ahmed.png',
      rating: '4.8'
    },
    {
      name: 'محمد السالم',
      specialty: 'محامي قانون جنائي',
      image: 'khalid.png',
      rating: '4.7'
    },
    {
      name: 'سارة أحمد',
      specialty: 'محامية قانون عقاري',
      image: 'khwalid.png',
      rating: '4.9'
    }
  ];

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
}