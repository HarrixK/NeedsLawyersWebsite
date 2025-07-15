import { Component, EventEmitter, Output, signal } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
   isMenuOpen:boolean = false;
  @Output() navigateToSection = new EventEmitter<string>();
 
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    // Add/remove class to body to prevent scrolling when menu is open
    if (this.isMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  }

  
  // Method to handle navigation clicks
  onNavClick(sectionId: string, event: Event) {
    event.preventDefault();
    this.navigateToSection.emit(sectionId);
    this.closeMenu();
  }

  closeMenu() {
    this.isMenuOpen = false;
    document.body.classList.remove('menu-open');
  }
}
