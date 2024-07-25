import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, NavigationEnd, Router, RouterModule} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { PersistablesService } from '../services/persistables.service';
import { ModalWalletPassword } from '../admin/wallet-password/wallet-password.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddressBookService } from '../services/addressBook.service';
import { Address } from '../interfaces/address';
import { BasicConfirmComponent } from '../modals/basic-confirm/basic-confirm.component';

@Component({
  selector: 'app-address-book-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './address-book-details.component.html',
  styleUrl: './address-book-details.component.css'
})

export class AddressBookDetailsComponent {

  private route: ActivatedRoute                   = inject(ActivatedRoute);
  private address_book_service:AddressBookService = inject(AddressBookService);
  private persistables:PersistablesService        = inject(PersistablesService);
  private modal_service:NgbModal                  = inject(NgbModal);
  
  public address_list: Address[] = [];
  public address_book_item: Address | undefined;

  public new_address_form:FormGroup = new FormGroup({
    address_name: new FormControl(''),
    address: new FormControl('')
  });

  /**
   * Based on the ID in the URL, get the wallet that matches it.
   */
  constructor(private router: Router) {   
    
    // This will allow us to reuse the same component and url but with different parameters
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    }

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.router.navigated = false;
      }
    });
    
    const address_book_action: string = this.route.snapshot.params['action']?.toLowerCase();
    const address_book_id: number     = Number(this.route.snapshot.params['id']);

    if (this.persistables.decryption_password == ''){
      const model_password = this.modal_service.open(ModalWalletPassword);

      model_password.result.then(() => {
        this.persistables.decryption_password = model_password.componentInstance.walletPassword.value.walletPassword;
        this.address_book_service.key = this.persistables.decryption_password;
        
        this.nextStep(address_book_action, address_book_id);
      }, 
      () => { 
        // Do nothing, it was cancelled
        console.log('Backdrop click')
        this.router.navigate(['']);
      });

    } else {
      // carry on, we already have a password
      this.address_book_service.key = this.persistables.decryption_password;

      this.nextStep(address_book_action, address_book_id);
    }
  }

  /**
   * Based on the action, do some specific steps
   * 
   * @param wallet_action 
   * @param wallet_id 
   */
  nextStep(address_book_action: string, address_book_id: number){

    this.address_list = this.address_book_service.getAllAddresses();

    if (address_book_action == 'delete'){
      const confirm_send = this.modal_service.open(BasicConfirmComponent);

      confirm_send.componentInstance.message = 'Are you sure you want to delete this address?';

      confirm_send.result.then(() => {
        this.address_book_service.deleteAddressByID(address_book_id);
        this.router.navigate(['/addresses']);
      }, 
      () => { 
        // Do nothing, it was cancelled
        console.log('Backdrop click')
      });
      
    }

    if (address_book_action == 'view'){
      this.address_book_item = this.address_book_service.getAddressById(address_book_id);
    }
  }

  /**
   * Build the wallet form object
   */
  newAddress() {
    this.address_book_service.newAddress(
      this.new_address_form.value.address_name ?? '',
      this.new_address_form.value.address ?? ''
    );

    this.address_list = this.address_book_service.getAllAddresses()
  }
}
