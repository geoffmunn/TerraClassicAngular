import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-wallet-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './wallet-password.component.html',
  styleUrl: './wallet-password.component.css'
})
export class WalletPasswordComponent {
  
  @Output() decryptionPassword = new EventEmitter();

  walletPassword = new FormGroup({
    walletPassword: new FormControl(''),
    // savePassword: new FormControl('')
  });

  constructor() {}

  decryptWallet() {

    console.log(this.walletPassword.value.walletPassword)

    this.decryptionPassword.emit({'password': this.walletPassword.value.walletPassword});
    
  }

}
