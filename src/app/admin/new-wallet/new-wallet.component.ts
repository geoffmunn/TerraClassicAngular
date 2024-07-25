import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LocalStorageWallet } from '../../services/localStorageWallet.service';
import { CommonModule } from '@angular/common';
import { UserWallet } from '../../classes/user-wallet';
@Component({
  selector: 'app-new-wallet',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-wallet.component.html',
  styleUrl: './new-wallet.component.css'
})

export class NewWalletComponent {
  
  public wallet_service:LocalStorageWallet = inject(LocalStorageWallet);

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
    const user_wallet:UserWallet = new UserWallet()

    this.new_wallet_form.get('wallet_address')?.setValue(user_wallet.createAddressFromSeed(($event.target as HTMLInputElement).value));
  }
}
