import { Component, HostListener } from '@angular/core';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
title = 'landing-page';
  showScrollTop = false;
  isLoading = true;
  
  constructor(private viewportScroller: ViewportScroller) {}
  
  ngOnInit(): void {
    // Simulate loading time
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
    
    // Add scroll listeners for animations
    this.setupScrollAnimations();
  }
  
  ngOnDestroy(): void {
    // Cleanup if needed
  }
  
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    this.showScrollTop = scrollTop > 300;
    
    // Trigger scroll animations
    this.handleScrollAnimations();
  }
  
  // Method to handle smooth scrolling between sections
scrollToSection(sectionId: any): void {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 100; // Adjust based on your header height
      const targetPosition = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  }
  
  // Alternative scroll method using native behavior
  scrollToElement(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
  
  // Setup scroll animations
  private setupScrollAnimations(): void {
    // Intersection Observer for fade-in animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe all elements with animation classes
    setTimeout(() => {
      const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
      animatedElements.forEach(el => observer.observe(el));
    }, 100);
  }
  
  // Handle scroll-triggered animations
  private handleScrollAnimations(): void {
    const scrollTop = window.pageYOffset;
    const sections = document.querySelectorAll('section');
    
    sections.forEach((section, index) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      if (scrollTop >= sectionTop - window.innerHeight / 2 && 
          scrollTop < sectionTop + sectionHeight) {
        section.classList.add('active');
      }
    });
  }
  
  // Method to get current active section
  getCurrentSection(): string {
    const sections = ['hero', 'services', 'features', 'reviews', 'contact'];
    const scrollPosition = window.pageYOffset + 100;
    
    for (let i = sections.length - 1; i >= 0; i--) {
      const element = document.getElementById(sections[i]);
      if (element && element.offsetTop <= scrollPosition) {
        return sections[i];
      }
    }
    return 'hero';
  }
  
  // Method to handle navigation clicks
  onNavClick(sectionId: string): void {
    this.scrollToSection(sectionId);
  }
  
  // Method to handle contact form submission (can be passed to child component)
  onContactSubmit(formData: any): void {
    console.log('Contact form submitted:', formData);
    // Handle form submission logic here
  }
  
  // Method to handle service selection
  onServiceSelect(serviceId: string): void {
    console.log('Service selected:', serviceId);
    // Handle service selection logic
  
  }
}
