import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, NavigationEnd, Router, RouterModule} from '@angular/router';
import { WalletService } from '../services/wallet.service';
import { Wallet } from '../interfaces/wallet';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { PersistablesService } from '../services/persistables.service';
import { ModalWalletPassword } from '../admin/wallet-password/wallet-password.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-wallet-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './wallet-details.component.html',
  styleUrl: './wallet-details.component.css'
})

export class WalletDetailsComponent {

  private route: ActivatedRoute        = inject(ActivatedRoute);
  private wallet_service:WalletService = inject(WalletService);
  private persistables                 = inject(PersistablesService);
  private modal_service                = inject(NgbModal);
  
  public wallet_list: Wallet[] = [];
  public wallet_item: Wallet | undefined;

  public new_wallet_form = new FormGroup({
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
      this.wallet_service.deleteWalletByID(wallet_id);
      this.router.navigate(['/wallets']);
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
    this.new_wallet_form.get('wallet_address')?.setValue(this.wallet_service.createAddressFromSeed(($event.target as HTMLInputElement).value));
  }
}
