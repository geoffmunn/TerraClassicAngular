import { CommonModule } from '@angular/common';
import { Component, inject, Input, Type } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { WalletService } from '../../services/wallet.service';
import { Wallet } from '@geoffmunn/feather.js';
import { WalletCoin } from '../../interfaces/walletcoin';
import { TransactionItem } from '../../interfaces/transactionItem';
import { NgbActiveModal, NgbModal, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-send',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgbDropdownModule],
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

  public validation_message: string = '';
  private default_address_text: string = 'Select an address...';
  public selected_address: string = this.default_address_text

  //public addresses:string[] = []

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
      if ('denom' in val){
          this.coin = val;

          this.sendMax = this.coin.formatted;
          this.send75  = this.coin.formatted * 0.75;
          this.send50  = this.coin.formatted * 0.5;
          this.send25  = this.coin.formatted * 0.25;
        }
    }

  @Input() address_list:string[] = []
    
  sendTransactionForm = new FormGroup({
    walletSendName: new FormControl(''),
    walletSendAddress: new FormControl(''),
    sendTransactionAmount: new FormControl(''),
  });

  /**
   * When someone clicks on a dropdown address, update the button text
   * 
   * @param $event
   */
  selectAddress($event:MouseEvent){
    var target:any = $event.target;
    this.selected_address = target.innerHTML;
  }

  /**
   * Using the provided transaction amount, update the form with the percentage amount.
   * @param percentage
   */
  populateAmount(transaction: TransactionItem){
    const amount:string = String(this.coin.formatted * Number(transaction.percentage));

    this.sendTransactionForm.get('sendTransactionAmount')?.setValue(amount)
  }

  /**
   * W
   */
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

    // Start validating the amount and address
    if (this.selected_address == this.default_address_text){
      this.validation_message = 'No recipient address was selected!'
    } else if (isNaN(send_amount)){
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
      
      const confirm_send = this.modalService.open(NgbdModalConfirmAutofocus);

      confirm_send.componentInstance.readable_amount = result.formatted + ' ' + result.readable;
      confirm_send.componentInstance.recipient_address = this.selected_address;

      confirm_send.result.then(() => {
        console.log('When user closes'); 
      }, 
      () => { 
        // Do nothing, it was cancelled
        console.log('Backdrop click')
      });

    }
  }
}
@Component({
	selector: 'ngbd-modal-confirm-autofocus',
	standalone: true,
	template: `
		<div class="modal-header">
			<h4 class="modal-title" id="modal-title">Send confirmation</h4>
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
				<strong>Are you sure you want to send <span class="text-primary">{{ readable_amount }}</span> to <span class="send-address">{{ recipient_address }}</span></strong>
			</p>
			<p>
				<span class="text-danger">This transaction can not be undone.</span>
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

  @Input() readable_amount: string = '';
  @Input() recipient_address: string = '';
}
export class NgbdDropdownBasic {}
