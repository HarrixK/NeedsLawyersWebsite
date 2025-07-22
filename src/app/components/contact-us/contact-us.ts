import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Language } from '../../services/language';
import { EmailRequest, EmailService } from '../../services/email';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-us',
  standalone: false,
  templateUrl: './contact-us.html',
  styleUrl: './contact-us.css'
})
export class ContactUs implements OnInit, OnDestroy {
  contactForm!: FormGroup;
  submitted = false;
  isLoading = false; // Add loading state
  language: 'ar' | 'en' = 'ar';
  private languageSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private languageService: Language,
    private emailService: EmailService // Inject email service
  ) {}

  ngOnInit() {
    this.languageSubscription = this.languageService.currentLanguage$.subscribe(
      currentLanguage => {
        if (currentLanguage === 'ar' || currentLanguage === 'en') {
          this.language = currentLanguage;
          this.initializeForm();
        }
      }
    );
  }

  ngOnDestroy() {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }

  private initializeForm() {
    this.contactForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^[a-zA-Zأ-ي\s]+$/)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^[a-zA-Zأ-ي\s]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, this.phoneValidator]],
      message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]]
    });
  }

  // Custom phone validator
  phoneValidator(control: AbstractControl): { [key: string]: any } | null {
    const phoneRegex = /^((\+966)|0)?[5-9]\d{8}$/; // Saudi phone number format
    if (control.value && !phoneRegex.test(control.value)) {
      return { 'invalidPhone': true };
    }
    return null;
  }

  onSubmit() {
    this.submitted = true;
    
    if (this.contactForm.valid && !this.isLoading) {
      this.isLoading = true;
      
      const formValue = this.contactForm.value;
      const emailBody = JSON.stringify({
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        email: formValue.email,
        phone: formValue.phone,
        message: formValue.message
      });
      
      // Prepare email data
      const emailData: EmailRequest = {
        emailAddress: formValue.email,
        subject: this.language === 'ar' ? 'استفسار من موقع NeedsLawyers' : 'Inquiry from NeedsLawyers',
        body: `firstName=${formValue.firstName}&lastName=${formValue.lastName}&email=${formValue.email}&phone=${formValue.phone}&message=${formValue.message}`
      };

      // Send email
      this.emailService.sendEmail(emailData).subscribe({
        next: (response) => {
          console.log('Email sent successfully:', response);
          const successMessage = this.language === 'ar' 
            ? 'تم إرسال الرسالة بنجاح! سنتواصل معك قريباً.' 
            : 'Message sent successfully! We will contact you soon.';
          alert(successMessage);
          this.clearForm();
        },
        error: (error) => {
          console.error('Error sending email:', error);
          const errorMessage = this.language === 'ar' 
            ? 'حدث خطأ في إرسال الرسالة. يرجى المحاولة مرة أخرى.' 
            : 'An error occurred while sending the message. Please try again.';
          alert(errorMessage);
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    } else if (!this.contactForm.valid) {
      console.log('Form is invalid');
      this.markAllFieldsAsTouched();
    }
  }

  clearForm() {
    this.contactForm.reset();
    this.submitted = false;
  }

  private markAllFieldsAsTouched() {
    Object.keys(this.contactForm.controls).forEach(key => {
      this.contactForm.get(key)?.markAsTouched();
    });
  }

  // Helper methods for template
  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched || this.submitted));
  }

  getErrorMessage(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    if (!field || !field.errors) return '';

    const errors = field.errors;
    
    if (errors['required']) {
      return this.getRequiredMessage(fieldName);
    }
    if (errors['email']) {
      return this.language === 'ar' ? 'يرجى إدخال بريد إلكتروني صحيح' : 'Please enter a valid email address';
    }
    if (errors['minlength']) {
      const fieldDisplayName = this.getFieldDisplayName(fieldName);
      const requiredLength = errors['minlength'].requiredLength;
      return this.language === 'ar' 
        ? `يجب أن يكون ${fieldDisplayName} على الأقل ${requiredLength} أحرف`
        : `${fieldDisplayName} must be at least ${requiredLength} characters`;
    }
    if (errors['maxlength']) {
      const fieldDisplayName = this.getFieldDisplayName(fieldName);
      const requiredLength = errors['maxlength'].requiredLength;
      return this.language === 'ar'
        ? `يجب أن يكون ${fieldDisplayName} أقل من ${requiredLength} أحرف`
        : `${fieldDisplayName} must be less than ${requiredLength} characters`;
    }
    if (errors['pattern']) {
      return this.getPatternMessage(fieldName);
    }
    if (errors['invalidPhone']) {
      return this.language === 'ar' 
        ? 'يرجى إدخال رقم هاتف صحيح (مثال: 0501234567)'
        : 'Please enter a valid phone number (example: 0501234567)';
    }
    
    return '';
  }

  private getRequiredMessage(fieldName: string): string {
    const messagesAr: { [key: string]: string } = {
      'firstName': 'الاسم الأول مطلوب',
      'lastName': 'الاسم الأخير مطلوب',
      'email': 'البريد الإلكتروني مطلوب',
      'phone': 'رقم الهاتف مطلوب',
      'message': 'الرسالة مطلوبة'
    };
    
    const messagesEn: { [key: string]: string } = {
      'firstName': 'First name is required',
      'lastName': 'Last name is required',
      'email': 'Email is required',
      'phone': 'Phone number is required',
      'message': 'Message is required'
    };
    
    const messages = this.language === 'ar' ? messagesAr : messagesEn;
    const defaultMessage = this.language === 'ar' ? 'هذا الحقل مطلوب' : 'This field is required';
    return messages[fieldName] || defaultMessage;
  }

  private getFieldDisplayName(fieldName: string): string {
    const namesAr: { [key: string]: string } = {
      'firstName': 'الاسم الأول',
      'lastName': 'الاسم الأخير',
      'email': 'البريد الإلكتروني',
      'phone': 'رقم الهاتف',
      'message': 'الرسالة'
    };
    
    const namesEn: { [key: string]: string } = {
      'firstName': 'First name',
      'lastName': 'Last name',
      'email': 'Email',
      'phone': 'Phone number',
      'message': 'Message'
    };
    
    const names = this.language === 'ar' ? namesAr : namesEn;
    return names[fieldName] || fieldName;
  }

  private getPatternMessage(fieldName: string): string {
    if (fieldName === 'firstName' || fieldName === 'lastName') {
      return this.language === 'ar' 
        ? 'يُسمح بالأحرف العربية والإنجليزية فقط'
        : 'Only Arabic and English letters are allowed';
    }
    return this.language === 'ar' ? 'تنسيق غير صحيح' : 'Invalid format';
  }
}