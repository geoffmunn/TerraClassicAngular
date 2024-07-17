import { Component, inject } from '@angular/core';
import { WalletService } from '../services/wallet.service';
import { WalletListComponent } from '../admin/wallet-list/wallet-list.component';
import { WalletPasswordComponent } from '../admin/wallet-password/wallet-password.component';
import { ActivatedRoute, Router } from '@angular/router';
import { SendComponent } from '../transactions/send/send.component';
import { WalletCoin } from '../interfaces/walletcoin';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersistablesService } from '../services/persistables.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [WalletListComponent, WalletPasswordComponent, SendComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {

  private route: ActivatedRoute = inject(ActivatedRoute);
  private modalService = inject(NgbModal);
  private persistables = inject(PersistablesService);

  public decryption_password              = '';
  public send_address: string             = '';
  public selected_wallet_id: number       = 0;
  public selected_wallet_coin: WalletCoin = {} as WalletCoin

  // /**
  //  * test
  //  * @param $event 
  //  */
  // decryptionComplete($event: any){
  //   console.log ('decryption complete!')
  // }
  /**
   * Receive the user password for decrypting the wallet
   * @param $event 
   */
  // decryptPassword($event:any){
  //   this.decryption_password = $event.password
  // }

  /**
   * This takes the selected coin from the table and passes it to the send component
   * @param $event 
   */
  selectWalletCoin(wallet_coin:WalletCoin){
    this.selected_wallet_coin = wallet_coin;
    this.selected_wallet_id = wallet_coin.wallet_id!;
  }

  constructor(private router: Router,){

    console.log ('persisted password:', this.persistables.decryption_password)

    // Check to see if this is a sub-page
    if(this.route.snapshot.url.length > 0){
      const action: string = this.route.snapshot.url[0].path.toLowerCase();
      const wallet_id: number = Number(this.route.snapshot.params['id']);

      // If this is a delete action, then delete the wallet and redirect back to the home page
      if (action == 'delete'){
        var walletService = inject(WalletService);

        walletService.deleteWalletByID(wallet_id);

        this.router.navigate(['']);
      }
    }

    if (this.persistables.decryption_password == ''){
      const test = this.modalService.open(NgbdModalConfirmAutofocus);

      test.result.then(() => {
        console.log(test.componentInstance.walletPassword.value.walletPassword)
        this.decryption_password = test.componentInstance.walletPassword.value.walletPassword
        this.persistables.decryption_password = this.decryption_password
      }, 
      () => { 
        // Do nothing, it was cancelled
        console.log('Backdrop click')
      });
    } else {
      this.decryption_password = this.persistables.decryption_password
    }
  }
}

@Component({
	selector: 'ngbd-modal-confirm-autofocus',
	standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
	template: `
		<div class="modal-header">
			<h4 class="modal-title" id="modal-title">Wallet password</h4>
			<button
				type="button"
				class="btn-close"
				aria-label="Close button"
				aria-describedby="modal-title"
				(click)="modal.dismiss('Cross click')"
			></button>
		</div>
		<div class="modal-body">
      <form [formGroup]="walletPassword">
          <label for="wallet-password">Wallet Password</label>
          <input id="wallet-password" type="password" formControlName="walletPassword" />
      </form>
		</div>
		<div class="modal-footer">
			<button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancel</button>
			<button type="button" ngbAutofocus class="btn btn-danger" (click)="modal.close('Ok click')">Ok</button>
		</div>
	`,
})

export class NgbdModalConfirmAutofocus {
	modal = inject(NgbActiveModal);

  walletPassword = new FormGroup({
    walletPassword: new FormControl(''),
  });
  // @Input() readable_amount: string = '';
  // @Input() recipient_address: string = '';

}