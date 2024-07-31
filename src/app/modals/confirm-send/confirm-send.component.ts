import { Component, inject, Input } from '@angular/core';
import { Coins, Fee } from '@geoffmunn/feather.js';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { WalletCoin } from '../../interfaces/walletCoin';
import { COIN_CODES, FULL_COIN_LOOKUP } from '../../constants';
import { UserWallet } from '../../classes/user-wallet';

@Component({
  selector: 'app-confirm-send',
  standalone: true,
  imports: [],
  templateUrl: './confirm-send.component.html',
  styleUrl: './confirm-send.component.css'
})

export class ConfirmSendComponent {
  modal = inject(NgbActiveModal);

  @Input() readable_amount: string   = '';
  @Input() recipient_address: string = '';

  @Input() 
    public set send_tx_fee(recieved_fee:Fee) {
      if (recieved_fee != undefined){
        
        const fee_coins = recieved_fee.amount.toData();

        let coin_list: WalletCoin[]  = [];
        const user_wallet:UserWallet = new UserWallet();
        
        for (var coin in fee_coins){
          let key              = Object.keys(COIN_CODES).find(key => COIN_CODES[key] === fee_coins[coin].denom);
          let formatted_amount = user_wallet.formatAmountToReadable(Number(fee_coins[coin].amount), fee_coins[coin].denom);

          var readable:string = FULL_COIN_LOOKUP[key!];

          var newCoin: WalletCoin = {
            amount: Number(fee_coins[coin].amount),
            denom: fee_coins[coin].denom,
            formatted: formatted_amount,
            readable: readable,
            wallet_id: 0
          };

          coin_list.push(newCoin);
        }

        this.send_tx_fee_coins = coin_list;
      }
    }

  public send_tx_fee_coins: WalletCoin[] | undefined;
}