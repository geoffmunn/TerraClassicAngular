import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { LocalStorageWallet } from '../../services/localStorageWallet.service';
import { WalletCoin } from '../../interfaces/walletCoin';
import { TransactionItem } from '../../interfaces/transactionItem';
import { NgbModal, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmSendComponent } from '../../modals/confirm-send/confirm-send.component';
import { Address } from '../../interfaces/address';
import { AddressType } from '../../interfaces/addressType';
import { AddressBookService } from '../../services/addressBook.service';
import { SendTransaction } from '../../classes/send-transaction';

import { UserWallet } from '../../classes/user-wallet';
import { RequestService } from '../../services/request.service';
import { Wallet } from '../../interfaces/wallet';
import { BalancesService } from '../../services/balances.service';
import { Coin } from '@geoffmunn/feather.js';

@Component({
  selector: 'app-send',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgbDropdownModule],
  templateUrl: './send.component.html',
  styleUrl: './send.component.css'
})

export class SendComponent {
  
  private local_wallet_service: LocalStorageWallet = inject(LocalStorageWallet);
  private address_book_service: AddressBookService = inject(AddressBookService);
  private modal_service:NgbModal                   = inject(NgbModal);
  private user_wallet: UserWallet                  = new UserWallet()
  private coin: WalletCoin                         = {} as WalletCoin;

  private balances: BalancesService = inject(BalancesService)

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
        const selected_wallet:any = this.local_wallet_service.getWalletById(val.wallet_id)
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
  @Input() address_list:Address[] = []
    
  // The send transaction form object
  public send_transaction_form:FormGroup = new FormGroup({
    wallet_send_name: new FormControl(''),
    wallet_send_address: new FormControl(''),
    send_transaction_amount: new FormControl(''),
  });

  /**
   * When someone clicks on a dropdown address, update the button text with the name of the wallet/address
   * 
   * @param $event
   */
  selectAddress($event:MouseEvent){
    var target:HTMLButtonElement  = $event.target as HTMLButtonElement
    let address_type: AddressType = target.getAttribute('data-address-type') as any;

    if (address_type == AddressType.WALLET){
      this.selected_address = String(this.local_wallet_service.getWalletById(Number(target.getAttribute('data-address-id')))?.address)
    } else {
      this.selected_address = String(this.address_book_service.getAddressById(Number(target.getAttribute('data-address-id')))?.address)
    }
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
      send_amount           = this.user_wallet.formatAmountToBase(Number(user_amount.replaceAll(',', '')), this.coin.denom)
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

      confirm_send.componentInstance.readable_amount   = result.formatted + ' ' + result.readable;
      confirm_send.componentInstance.recipient_address = this.selected_address;

      // Simulate the transaction and display the fee:
        // We now have a wallet in the coin object
      // Create a Wallet object and pass this to the sendTransaction service

      let local_wallet = this.local_wallet_service.getWalletById(this.coin.wallet_id);
      
      if (local_wallet != undefined){

        
        // We need to send a simulation request
        // We need to create a wallet item that holds the necessary information
        this.user_wallet.create(local_wallet.seed).then(value => {
      
          // Now we have the wallet, we can go and do a simulation and so forth...
          
          var send_tx = new SendTransaction();
          send_tx.create(local_wallet.seed)
          var send_coin:Coin = new Coin(result.denom!, result.amount!)
          
          send_tx.simulate(this.user_wallet, this.selected_address, send_coin).then((value:SendTransaction) => {
            confirm_send.componentInstance.send_tx_fee = value.fee;
          })

        })
      }
      confirm_send.result.then(() => {
        console.log('When user closes'); 

        // console.log (this.coin)
        // // We now have a wallet in the coin object
        // // Create a Wallet object and pass this to the sendTransaction service

        // let local_wallet = this.local_wallet_service.getWalletById(this.coin.wallet_id);

        // console.log ('local wallet:', local_wallet)
        
        // if (local_wallet != undefined){

          
        //   // We need to send a simulation request
        //   // We need to create a wallet item that holds the necessary information
        //   this.user_wallet.create(local_wallet.seed).then(value => {
        //     console.log ('finished value:', value)
        //     console.log ('finished!')
        //     console.log ('uluna balance:', this.user_wallet.balances.balances.get('uluna'))

        //     // Now we have the wallet, we can go and do a simulation and so forth...
            
        //     var send_tx = new SendTransaction();
        //     console.log ('creating send tx object')
        //     send_tx.create(local_wallet.seed)
        //     var send_coin:Coin = new Coin(result.denom!, result.amount!)
            
        //     console.log('starting simulation')
        //     send_tx.simulate(this.user_wallet, this.selected_address, send_coin)
        //   })

        //   console.log ('outer finished! All internal functions from here.')


          // console.log ('balances:', this.user_wallet.balances.balances.get('uluna'))


          //let test = await this.user_wallet.getBalances()
          //console.log ('balances:', this.balances)
          // let wallet:Wallet = {
          //   name: local_wallet.name,
          //   address: local_wallet.address,
          //   seed:local_wallet.seed,
          //   balances: local_wallet.
          // }
          // let send_tx = new sendTransaction()
          // send_tx.create(local_wallet.seed)

          // var send_wallet:Wallet = {
          //   name: local_wallet.name,
          //   address: this.local_wallet_service.createAddressFromSeed(local_wallet.seed),
          //   seed: local_wallet.seed
          // }

          // let wallet_item:WalletItem = inject(WalletItem);
          
          // wallet_item.create(local_wallet?.seed)

          // console.log ('sending from:', wallet_item.address)

          // var injector = Injector.create([
          //   { provide: WalletItem, multi: true, deps: []}
          // ]);

          // var test = injector.get(WalletItem)
          // console.log(test)

          // var wallet1:WalletItem = new this.wallet_item_service()
          // wallet1.create(local_wallet.seed)
          // console.log ('wallet 1:', wallet1.address)
        //}
        //let send_tx = new sendTransaction()
        //send_tx.create()
      }, 
      () => { 
        // Do nothing, it was cancelled
        console.log('Backdrop click')
      });

    }
  }
}

export class NgbdDropdownBasic {}
