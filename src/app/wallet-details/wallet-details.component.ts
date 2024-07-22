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

  private route: ActivatedRoute = inject(ActivatedRoute);
  private wallet_service:WalletService        = inject(WalletService);
  private persistables          = inject(PersistablesService)
  private modalService = inject(NgbModal);
  
  public wallet_list: Wallet[] = []

  public wallet_item : Wallet | undefined;

  public newWalletForm = new FormGroup({
    walletName: new FormControl(''),
    walletAddress: new FormControl(''),
    walletSeed: new FormControl(''),
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
    const wallet_id: number = Number(this.route.snapshot.params['id']);

    if (this.persistables.decryption_password == ''){
      const model_password = this.modalService.open(ModalWalletPassword);

      model_password.result.then(() => {
        this.persistables.decryption_password = model_password.componentInstance.walletPassword.value.walletPassword
        this.wallet_service.key = this.persistables.decryption_password
        
        this.nextStep(wallet_action, wallet_id)
      }, 
      () => { 
        // Do nothing, it was cancelled
        console.log('Backdrop click')
        this.router.navigate(['']);
      });

    } else {
      // carry on, we already have a password
      this.wallet_service.key = this.persistables.decryption_password

      
      this.nextStep(wallet_action, wallet_id)
    }
    
  }

  nextStep(wallet_action: string, wallet_id: number){

    this.wallet_list = this.wallet_service.getAllWallets()

    if (wallet_action == 'delete'){
      //console.log ('deleting:', wallet_id)
      this.wallet_service.deleteWalletByID(wallet_id);
      //console.log ('done, redirecting')
      this.router.navigate(['/wallets']);
    }

    if (wallet_action == 'view'){

      this.wallet_item = this.wallet_service.getWalletById(wallet_id)
      //console.log ('wallet item to use:', this.wallet_item)
    }

    //this.wallet_list = this.wallet_service.getAllWallets()
  }

  /**
   * Build the wallet form object
   */
  newWallet() {
    console.log ('start!')
    console.log ('wallet list at the start:', this.wallet_list)
    this.wallet_service.newWallet(
      this.newWalletForm.value.walletName ?? '',
      this.newWalletForm.value.walletAddress ?? '',
      this.newWalletForm.value.walletSeed ?? '',
    );

    this.wallet_list = this.wallet_service.getAllWallets()
    console.log ('wallet list after add:', this.wallet_list)
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
