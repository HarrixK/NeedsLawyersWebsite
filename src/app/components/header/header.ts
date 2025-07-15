import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Language} from '../../services/language';
import { translations } from '../../services/translations';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
  standalone: false
})
export class Header implements OnInit, OnDestroy {
  @Output() navigateToSection = new EventEmitter<string>();
  isMenuOpen: boolean = false;
  currentLanguage: string = 'ar';
  translations = translations;
  private languageSubscription!: Subscription;

  constructor(
    private router: Router,
    private languageService: Language
  ) {}

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

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  toggleLanguage() {
    this.languageService.toggleLanguage();
  }

  onNavClick(sectionId: string, event: Event) {
    event.preventDefault();
    
    if (this.router.url === '/') {
      this.navigateToSection.emit(sectionId);
    } else {
      this.router.navigate(['/']).then(() => {
        setTimeout(() => {
          this.navigateToSection.emit(sectionId);
        }, 100);
      });
    }
    
    this.closeMenu();
  }
}