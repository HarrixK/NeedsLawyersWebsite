import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EmailRequest {
  emailAddress: string;
  subject: string;
  body: any;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiUrl = 'http://api.needslawyers.com/api/Notification/SendEmail';

  constructor(private http: HttpClient) {}

  sendEmail(emailData: EmailRequest): Observable<any> {
    const headers = new HttpHeaders({
      'accept': 'text/plain',
      'Content-Type': 'application/json'
    });

    return this.http.post(this.apiUrl, emailData, { headers });
  }
}