import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  standalone: false,
  templateUrl: './contact-us.html',
  styleUrl: './contact-us.css'
})
export class ContactUs implements OnInit {
  contactForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initializeForm();
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
    
    if (this.contactForm.valid) {
      console.log('Form submitted:', this.contactForm.value);
      // Handle form submission here
      alert('تم إرسال الرسالة بنجاح!');
      this.clearForm();
    } else {
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
      return 'يرجى إدخال بريد إلكتروني صحيح';
    }
    if (errors['minlength']) {
      return `يجب أن يكون ${this.getFieldDisplayName(fieldName)} على الأقل ${errors['minlength'].requiredLength} أحرف`;
    }
    if (errors['maxlength']) {
      return `يجب أن يكون ${this.getFieldDisplayName(fieldName)} أقل من ${errors['maxlength'].requiredLength} أحرف`;
    }
    if (errors['pattern']) {
      return this.getPatternMessage(fieldName);
    }
    if (errors['invalidPhone']) {
      return 'يرجى إدخال رقم هاتف صحيح (مثال: 0501234567)';
    }
    
    return '';
  }

  private getRequiredMessage(fieldName: string): string {
    const messages: { [key: string]: string } = {
      'firstName': 'الاسم الأول مطلوب',
      'lastName': 'الاسم الأخير مطلوب',
      'email': 'البريد الإلكتروني مطلوب',
      'phone': 'رقم الهاتف مطلوب',
      'message': 'الرسالة مطلوبة'
    };
    return messages[fieldName] || 'هذا الحقل مطلوب';
  }

  private getFieldDisplayName(fieldName: string): string {
    const names: { [key: string]: string } = {
      'firstName': 'الاسم الأول',
      'lastName': 'الاسم الأخير',
      'email': 'البريد الإلكتروني',
      'phone': 'رقم الهاتف',
      'message': 'الرسالة'
    };
    return names[fieldName] || fieldName;
  }

  private getPatternMessage(fieldName: string): string {
    if (fieldName === 'firstName' || fieldName === 'lastName') {
      return 'يُسمح بالأحرف العربية والإنجليزية فقط';
    }
    return 'تنسيق غير صحيح';
  }
}