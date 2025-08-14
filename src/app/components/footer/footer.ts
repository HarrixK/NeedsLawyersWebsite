import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { Language } from '../../services/language';
import { translations } from '../../services/translations';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

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
  @Output() navigateToSection = new EventEmitter<string>();

  constructor(private languageService: Language, private router: Router) {}

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

  onNavClick(sectionId: string, event: Event) {
    if (this.router.url !== '/') {
      console.log('If')
      event.preventDefault();
      this.router.navigate(['/']).then(() => {
        setTimeout(() => {
          document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      });
    }
    else {
      this.router.navigate(['/']).then(() => {
        setTimeout(() => {
          document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      });
    }
  }
}