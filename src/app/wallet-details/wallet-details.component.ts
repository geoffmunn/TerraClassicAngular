import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, NavigationEnd, Router, RouterModule} from '@angular/router';
import { LocalStorageWallet } from '../services/localStorageWallet.service';
import { LocalWallet } from '../interfaces/localWallet';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { PersistablesService } from '../services/persistables.service';
import { ModalWalletPassword } from '../admin/wallet-password/wallet-password.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BasicConfirmComponent } from '../modals/basic-confirm/basic-confirm.component';
import { UserWallet } from '../classes/user-wallet';

@Component({
  selector: 'app-wallet-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './wallet-details.component.html',
  styleUrl: './wallet-details.component.css'
})

export class WalletDetailsComponent {

  private route: ActivatedRoute             = inject(ActivatedRoute);
  private wallet_service: LocalStorageWallet     = inject(LocalStorageWallet);
  private persistables: PersistablesService = inject(PersistablesService);
  private modal_service: NgbModal           = inject(NgbModal);
  
  public wallet_list: LocalWallet[] = [];
  public wallet_item: LocalWallet | undefined;

  public new_wallet_form: FormGroup = new FormGroup({
    wallet_name: new FormControl(''),
    wallet_address: new FormControl(''),
    wallet_seed: new FormControl(''),
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
    
    const wallet_action: string = this.route.snapshot.params['action']?.toLowerCase();
    const wallet_id: number     = Number(this.route.snapshot.params['id']);

    if (this.persistables.decryption_password == ''){
      const model_password = this.modal_service.open(ModalWalletPassword);

      model_password.result.then(() => {
        this.persistables.decryption_password = model_password.componentInstance.walletPassword.value.walletPassword;
        this.wallet_service.key               = this.persistables.decryption_password;
        
        this.nextStep(wallet_action, wallet_id);
      }, 
      () => { 
        // Do nothing, it was cancelled
        console.log('Backdrop click');
        this.router.navigate(['']);
      });

    } else {
      // carry on, we already have a password
      this.wallet_service.key = this.persistables.decryption_password;

      this.nextStep(wallet_action, wallet_id);
    }
  }

  /**
   * Based on the action, do some specific steps
   * 
   * @param wallet_action 
   * @param wallet_id 
   */
  nextStep(wallet_action: string, wallet_id: number){

    this.wallet_list = this.wallet_service.getAllWallets();

    if (wallet_action == 'delete'){
      const confirm_send = this.modal_service.open(BasicConfirmComponent);

      confirm_send.componentInstance.message = 'Are you sure you want to delete this wallet?';

      confirm_send.result.then(() => {
        this.wallet_service.deleteWalletByID(wallet_id);
        this.router.navigate(['/wallets']);
      }, 
      () => { 
        // Do nothing, it was cancelled
        console.log('Backdrop click')
      });
    }

    if (wallet_action == 'view'){
      this.wallet_item = this.wallet_service.getWalletById(wallet_id);
    }
  }

  /**
   * Build the wallet form object
   */
  newWallet() {
    this.wallet_service.new_wallet(
      this.new_wallet_form.value.wallet_name ?? '',
      this.new_wallet_form.value.wallet_address ?? '',
      this.new_wallet_form.value.wallet_seed ?? '',
    );

    this.wallet_list = this.wallet_service.getAllWallets();
  }

  /**
   * Based on the seed in the form, generate the address and populate the form field with the result
   * 
   * @param $event
   */
  generateAddress($event: Event){
    const user_wallet: UserWallet = new UserWallet();

    this.new_wallet_form.get('wallet_address')?.setValue(user_wallet.createAddressFromSeed(($event.target as HTMLInputElement).value));
  }
}
