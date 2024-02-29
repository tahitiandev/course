import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }

  sendEmail() {
    const sendGridApiKey = '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';
    const apiUrl = 'https://api.sendgrid.com/v3/mail/send';

    const emailData = {
      personalizations: [
        {
          to: [{ email: 'gheitaa@idt.pf' }],
          subject: 'Test email from Ionic app'
        }
      ],
      from: { email: 'heitaa.gilles1@gmail.com' },
      content: [
        {
          type: 'text/plain',
          value: 'This is a test email sent from an Ionic app using SendGrid!'
        }
      ]
    };

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sendGridApiKey}`,
      'Content-Type': 'application/json'
    });

    this.http.post(apiUrl, emailData, { headers })
      .subscribe(
        () => {
          console.log('Email sent successfully');
        },
        error => {
          console.error('Error sending email:', error);
        }
      );
  }
  
}
