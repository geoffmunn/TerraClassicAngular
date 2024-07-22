import { Component, inject, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-basic-confirm',
  standalone: true,
  imports: [],
  templateUrl: './basic-confirm.component.html',
  styleUrl: './basic-confirm.component.css'
})
export class BasicConfirmComponent {

  modal = inject(NgbActiveModal);

  @Input() message: string = '';
}
