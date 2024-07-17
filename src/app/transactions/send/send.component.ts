import { CommonModule } from '@angular/common';
import { Component, inject, Input, Type } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { WalletService } from '../../services/wallet.service';
import { Wallet } from '@geoffmunn/feather.js';
import { WalletCoin } from '../../interfaces/walletcoin';
import { TransactionItem } from '../../interfaces/transactionItem';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-send',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './send.component.html',
  styleUrl: './send.component.css'
})

export class SendComponent {

  private wallet_service: WalletService = inject(WalletService);
  private modalService = inject(NgbModal);

  private wallet: Wallet   = {} as Wallet;
  private coin: WalletCoin = {} as WalletCoin;

  public sendMax: number = 0;
  public send75: number  = 0;
  public send50: number  = 0;
  public send25: number  = 0;

  public validation_message: string = ''

  @Input() 
    public set selected_wallet_id(val: number) {
      if (val !== undefined){
        var selected_wallet:any = this.wallet_service.getWalletById(val)

        if (selected_wallet !== undefined){
          this.sendTransactionForm.get('walletSendName')?.setValue(selected_wallet.name)
          this.wallet = selected_wallet;
        }
      }
    }

  @Input() 
    public set selected_wallet_coin(val: WalletCoin) {
      console.log ('received wallet coin:', val)
      console.log (val.denom)
      if ('denom' in val){
          this.coin = val;

          this.sendMax = this.coin.formatted;
          this.send75  = this.coin.formatted * 0.75;
          this.send50  = this.coin.formatted * 0.5;
          this.send25  = this.coin.formatted * 0.25;
        }
    }
    
  sendTransactionForm = new FormGroup({
    walletSendName: new FormControl(''),
    walletSendAddress: new FormControl(''),
    sendTransactionAmount: new FormControl('', [Validators.max(100), Validators.min(0)]),
  });

  sendTransaction(){
    // Validate the amount:
    const user_amount:string = String(this.sendTransactionForm.value.sendTransactionAmount?.trim())

    let send_amount: number = 0;
    let send_amount_formatted: number = 0;
    let result: TransactionItem = {} as TransactionItem
    
    // This could be a percentage value, or a number, or comma'd
    if (user_amount[user_amount.length - 1] == '%'){
      // This is a percentage, so calculate the correct amount:
      const percentage:number = Number(user_amount.substring(0, user_amount.length - 1).trim()) / 100

      send_amount           = this.coin.amount * percentage
      send_amount_formatted = this.coin.formatted * percentage
    } else {
      // Not a percentage, but we need to remove commas
      send_amount = this.wallet_service.formatAmountToBase(Number(user_amount.replaceAll(',', '')), this.coin.denom)
      send_amount_formatted = Number(user_amount.replaceAll(',', ''))
    }

    if (isNaN(send_amount)){
      // Display validation error message
      this.validation_message = 'The amount to send is not valid!'
    } else if (send_amount_formatted > this.coin.formatted){ 
      this.validation_message = 'The amount to send exceeds the available balance!';
    } else if (send_amount_formatted <= 0){
      this.validation_message = 'The amount to send is not valid!'
    } else {
      // Clear any old message
      this.validation_message = ''

      // Create the Transaction item:
      result.amount    = send_amount;
      result.formatted = send_amount_formatted;
      result.denom     = this.coin.denom
      result.readable  = this.coin.readable

      console.log('final result:', result)
      const test = this.modalService.open(NgbdModalConfirmAutofocus);

      test.result.then(() => {
        console.log('When user closes'); 
      }, 
      () => { 
        // Do nothing, it was cancelled
        console.log('Backdrop click')
      });

    }
  }

  /**
   * Using the provided transaction amount, update the form with the percentage amount.
   * @param percentage
   */
  populateAmount(transaction: TransactionItem){
    const amount:string = String(this.coin.formatted * Number(transaction.percentage));

    this.sendTransactionForm.get('sendTransactionAmount')?.setValue(amount)
  }
}

@Component({
	selector: 'ngbd-modal-confirm-autofocus',
	standalone: true,
	template: `
		<div class="modal-header">
			<h4 class="modal-title" id="modal-title">Profile deletion</h4>
			<button
				type="button"
				class="btn-close"
				aria-label="Close button"
				aria-describedby="modal-title"
				(click)="modal.dismiss('Cross click')"
			></button>
		</div>
		<div class="modal-body">
			<p>
				<strong>Are you sure you want to delete <span class="text-primary">"John Doe"</span> profile?</strong>
			</p>
			<p>
				All information associated to this user profile will be permanently deleted.
				<span class="text-danger">This operation can not be undone.</span>
			</p>
		</div>
		<div class="modal-footer">
			<button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancel</button>
			<button type="button" ngbAutofocus class="btn btn-danger" (click)="modal.close('Ok click')">Ok</button>
		</div>
	`,
})

export class NgbdModalConfirmAutofocus {
	modal = inject(NgbActiveModal);
}

// export class NgbdModalFocus {
// 	private modalService = inject(NgbModal);

// 	open(name: string) {
//     console.log('opening!')
// 		this.modalService.open(NgbdModalConfirmAutofocus);
// 	}

//   close(test: any){
//     console.log ('closed!', test)
//   }
// }
