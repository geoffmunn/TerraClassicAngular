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
  
  walletService = inject(WalletService);
  walletAddress: string = '';

  newWalletForm = new FormGroup({
    walletName: new FormControl(''),
    walletAddress: new FormControl(''),
    walletSeed: new FormControl(''),
  });

  constructor() {}

  newWallet() {
    this.walletService.newWallet(
      this.newWalletForm.value.walletName ?? '',
      this.newWalletForm.value.walletAddress ?? '',
      this.newWalletForm.value.walletSeed ?? '',
    );
  }

  generateAddress($event: any){
    this.newWalletForm.get('walletAddress')?.setValue(this.walletService.createAddressFromSeed($event.target.value))
  }
}
