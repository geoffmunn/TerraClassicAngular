import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { WalletService } from '../../services/wallet.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-wallet',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-wallet.component.html',
  styleUrl: './new-wallet.component.css'
})

export class NewWalletComponent {
  
  wallet_service = inject(WalletService);

  newWalletForm = new FormGroup({
    walletName: new FormControl(''),
    walletAddress: new FormControl(''),
    walletSeed: new FormControl(''),
  });

  constructor() {}

  /**
   * Build the wallet form object
   */
  newWallet() {
    this.wallet_service.newWallet(
      this.newWalletForm.value.walletName ?? '',
      this.newWalletForm.value.walletAddress ?? '',
      this.newWalletForm.value.walletSeed ?? '',
    );
  }

  /**
   * Based on the seed in the form, generate the address and populate the form field with the result
   * 
   * @param $event
   */
  generateAddress($event: Event){
    this.newWalletForm.get('walletAddress')?.setValue(this.wallet_service.createAddressFromSeed(($event.target as HTMLInputElement).value));
  }
}
