import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EmailRequest {
  Name: string;
  Email: string;
  Subject: string;
  Telephone: string;
  Body: any;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiUrl = 'https://api.ilawyerapp.com/api/Claims/SendEmailClaim';

  constructor(private http: HttpClient) {}

  sendEmail(emailData: EmailRequest): Observable<any> {
    const headers = new HttpHeaders({
      'accept': 'text/plain',
      'Content-Type': 'application/json'
    });

    return this.http.post(this.apiUrl, emailData, { headers });
  }
}