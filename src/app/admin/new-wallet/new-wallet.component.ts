import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { WalletService } from '../../services/wallet.service';
import { CommonModule } from '@angular/common';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-new-wallet',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-wallet.component.html',
  styleUrl: './new-wallet.component.css'
})

export class NewWalletComponent {
  
  public wallet_service:WalletService = inject(WalletService);

  public new_wallet_form:FormGroup = new FormGroup({
    wallet_name: new FormControl(''),
    wallet_address: new FormControl(''),
    wallet_seed: new FormControl(''),
  });

  constructor() {}

  /**
   * Build the wallet form object
   */
  newWallet() {
    this.wallet_service.new_wallet(
      this.new_wallet_form.value.wallet_name ?? '',
      this.new_wallet_form.value.wallet_address ?? '',
      this.new_wallet_form.value.wallet_seed ?? '',
    );
  }

  /**
   * Based on the seed in the form, generate the address and populate the form field with the result
   * 
   * @param $event
   */
  generateAddress($event: Event){
    this.new_wallet_form.get('wallet_address')?.setValue(this.wallet_service.createAddressFromSeed(($event.target as HTMLInputElement).value));
  }
}
