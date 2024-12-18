import { Component, OnInit } from '@angular/core';
import { ErrorMessageService } from './error-message.service';

@Component({
  selector: 'app-error-message',
  imports: [],
  templateUrl: './error-message.component.html',
  styleUrl: './error-message.component.css',
})
export class ErrorMessageComponent implements OnInit {
  errorMsg = '';

  constructor(private errorMessageService: ErrorMessageService) {}

  ngOnInit(): void {
    this.errorMessageService.apiError$.subscribe((err: any) => {
      this.errorMsg = err?.message;
    });
  }
}
