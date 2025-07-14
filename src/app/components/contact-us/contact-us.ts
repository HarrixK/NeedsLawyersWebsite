import { Component } from '@angular/core';

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}
@Component({
  selector: 'app-contact-us',
  standalone: false,
  templateUrl: './contact-us.html',
  styleUrl: './contact-us.css'
})
export class ContactUs {
formData: ContactFormData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  };

  onSubmit() {
    if (this.isFormValid()) {
      console.log('Form submitted:', this.formData);
      // Handle form submission here
      alert('تم إرسال الرسالة بنجاح!');
      this.clearForm();
    }
  }

  clearForm() {
    this.formData = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: ''
    };
  }

  private isFormValid(): boolean {
    return !!(
      this.formData.firstName &&
      this.formData.lastName &&
      this.formData.email &&
      this.formData.phone &&
      this.formData.message
    );
  }
}
