import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { WalletService } from '../../services/wallet.service';
import { WalletCoin } from '../../interfaces/walletcoin';
import { TransactionItem } from '../../interfaces/transactionItem';
import { NgbActiveModal, NgbModal, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmSendComponent } from '../../modals/confirm-send/confirm-send.component';
@Component({
  selector: 'app-send',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgbDropdownModule],
  templateUrl: './send.component.html',
  styleUrl: './send.component.css'
})

export class SendComponent {

  private wallet_service: WalletService = inject(WalletService);
  private modal_service:NgbModal        = inject(NgbModal);

  private coin: WalletCoin = {} as WalletCoin;

  // The preset percentage options we can send
  public send_max: number = 0;
  public send_75: number  = 0;
  public send_50: number  = 0;
  public send_25: number  = 0;

  private default_address_text: string = 'Select an address...';
  public validation_message: string    = '';
  public selected_address: string      = this.default_address_text;

  @Input() 
    public set selected_wallet_coin(val: WalletCoin) {
      if ('denom' in val){
        const selected_wallet:any = this.wallet_service.getWalletById(val.wallet_id)
        if (selected_wallet !== undefined){
          this.coin = val;

          this.send_max = this.coin.formatted;
          this.send_75  = this.coin.formatted * 0.75;
          this.send_50  = this.coin.formatted * 0.5;
          this.send_25  = this.coin.formatted * 0.25;

          this.send_transaction_form.get('wallet_send_name')?.setValue(selected_wallet.name)
          }
        }
    }

  // This is received from the parent component, but is also found in the persistables service
  @Input() address_list:string[] = []
    
  // The send transaction form object
  public send_transaction_form:FormGroup = new FormGroup({
    wallet_send_name: new FormControl(''),
    wallet_send_address: new FormControl(''),
    send_transaction_amount: new FormControl(''),
  });

  /**
   * When someone clicks on a dropdown address, update the button text
   * 
   * @param $event
   */
  selectAddress($event:MouseEvent){
    var target:any        = $event.target;
    this.selected_address = target.innerHTML;
  }

  /**
   * Using the provided transaction amount, update the form with the percentage amount.
   * @param transaction
   */
  populateAmount(transaction: TransactionItem){
    const amount:string = String(this.coin.formatted * Number(transaction.percentage));
    this.send_transaction_form.get('send_transaction_amount')?.setValue(amount);
  }

  /**
   * With the provided details, validate the amount and address and then get confirmation to send
   */
  sendTransaction(){
    // Validate the amount:
    const user_amount:string          = String(this.send_transaction_form.value.send_transaction_amount?.trim())
    let send_amount: number           = 0;
    let send_amount_formatted: number = 0;
    let result: TransactionItem       = {} as TransactionItem
    
    // This could be a percentage value, or a number, or comma'd
    if (user_amount[user_amount.length - 1] == '%'){
      // This is a percentage, so calculate the correct amount:
      const percentage:number = Number(user_amount.substring(0, user_amount.length - 1).trim()) / 100

      send_amount           = this.coin.amount * percentage
      send_amount_formatted = this.coin.formatted * percentage
    } else {
      // Not a percentage, but we need to remove commas
      send_amount           = this.wallet_service.formatAmountToBase(Number(user_amount.replaceAll(',', '')), this.coin.denom)
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
      
      const confirm_send = this.modal_service.open(ConfirmSendComponent);

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

export class NgbdDropdownBasic {}
