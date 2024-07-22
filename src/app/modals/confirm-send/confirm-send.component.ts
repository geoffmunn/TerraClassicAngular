import { Component, inject, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-send',
  standalone: true,
  imports: [],
  templateUrl: './confirm-send.component.html',
  styleUrl: './confirm-send.component.css'
})

export class ConfirmSendComponent {
  modal = inject(NgbActiveModal);

  @Input() readable_amount: string   = '';
  @Input() recipient_address: string = '';
}