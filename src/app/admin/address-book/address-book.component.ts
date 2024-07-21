import { Component, inject } from '@angular/core';
import { AddressBookService } from '../../services/address-book.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersistablesService } from '../../services/persistables.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { ModalWalletPassword } from '../wallet-password/wallet-password.component';

@Component({
  selector: 'app-address-book',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './address-book.component.html',
  styleUrl: './address-book.component.css'
})

export class AddressBookComponent {

  public address_service = inject(AddressBookService);
  private persistables = inject(PersistablesService);

  private modalService = inject(NgbModal);
  
  public newAddressForm = new FormGroup({
    addressName: new FormControl(''),
    address: new FormControl(''),
  });

  constructor() {

    this.address_service.address_list = this.address_service.getAllAddresses();
    
    if (this.persistables.decryption_password == ''){
      const test = this.modalService.open(ModalWalletPassword);

      test.result.then(() => {
        this.persistables.decryption_password = test.componentInstance.walletPassword.value.walletPassword
        this.address_service.key = this.persistables.decryption_password

        console.log ('restored decryption key is:', this.address_service.key)
        this.address_service.address_list = this.address_service.getAllAddresses();
        console.log ('the restored address list is:', this.address_service.address_list)
      }, 
      () => { 
        // Do nothing, it was cancelled
        console.log('Backdrop click')
      });
    } else {
      this.address_service.key = this.persistables.decryption_password
      this.address_service.address_list = this.address_service.getAllAddresses();
    }
  }

  /**
   * Build the wallet form object
   */
  newAddress() {
    this.address_service.newAddress(
      this.newAddressForm.value.addressName ?? '',
      this.newAddressForm.value.address ?? ''
    );
  }

}