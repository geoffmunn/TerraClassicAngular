import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'modal-wallet-password',
	standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
	templateUrl: './wallet-password.component.html',
  styleUrl: './wallet-password.component.css'
})

export class ModalWalletPassword {
	
  public modal:NgbActiveModal = inject(NgbActiveModal);

  public walletPassword = new FormGroup({
    walletPassword: new FormControl(''),
  });
}