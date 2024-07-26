import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalStorageWallet } from '../../services/localStorageWallet.service';
import { BalancesService } from '../../services/balances.service';
import { WalletCoin } from '../../interfaces/walletCoin';

import _ from 'lodash';
import { RouterModule } from '@angular/router';
import { UserWallet } from '../../classes/user-wallet';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-wallet-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './wallet-list.component.html',
  styleUrl: './wallet-list.component.css'
})

export class WalletListComponent {

  
  public all_coins: { [key: string]: WalletCoin }   = {}
  private _all_coins: { [key: string]: WalletCoin } = {}

  public wallet_service: LocalStorageWallet = inject(LocalStorageWallet);

  public wallet_balances: { [key: string]: any }   = {}
  private _wallet_balances: { [key: string]: any } = {}

  public request_service:RequestService = inject (RequestService);

  @Input() 
    public set password(val: any) {
      if (val != ''){
        this.wallet_service.key = val;
        this.create_list();
      }
    }
    
  @Output() selectedWalletCoin = new EventEmitter();

  //filteredWalletList: Wallet[] = [];

  // filterResults(text: string) {
  //   if (!text) {
  //     this.filteredWalletList = this.walletList;
  //     return;
  //   }
  //   this.filteredWalletList = this.walletList.filter((walletItem) =>
  //     walletItem?.name.toLowerCase().includes(text.toLowerCase()),
  //   );
  // }

  private async get_wallet_balances(){
    
    const user_wallet:UserWallet  = new UserWallet(this.request_service);
    user_wallet.denom_service.key = this.wallet_service.key;

    // Get the raw balances for each wallet and attach it to the object
    for (var i = 0; i < this.wallet_service.wallet_list.length; i++){
      if (i in this.wallet_service.wallet_list){
        var balances: BalancesService = await user_wallet.getBalances(this.wallet_service.wallet_list[i].address);

        balances.balances.forEach((item:WalletCoin) => {
          this._all_coins[item.denom] = item;
        })

        this._wallet_balances[this.wallet_service.wallet_list[i].name] = _.cloneDeep(balances.balances);
      }
    }

    // Go through each wallet and add any missing coins from the allCoins list
    for (var wallet_balance_key in this._wallet_balances){
      for (var all_coins_key in this._all_coins){
        if (!this._wallet_balances[wallet_balance_key].has(all_coins_key)){
          var coin: WalletCoin = {
            amount: 0,
            denom: all_coins_key,
            formatted: 0,
            readable: all_coins_key,
            wallet_id: 0
          }

          this._wallet_balances[wallet_balance_key].set(all_coins_key, coin);
        }
      }
    }
    
    this.all_coins       = this._all_coins;
    this.wallet_balances = this._wallet_balances;
  }

  /**
   * Create the list of wallets and associated balances.
   * The decryption key must have been set prior to this being called.
   */
  public create_list(): boolean {

    if (this.wallet_service.key != '') {
      try {
        // Get all the wallets in our localStorage object
        this.wallet_service.wallet_list = this.wallet_service.getAllWallets();

        //Get the balance for each wallet
        this.get_wallet_balances();

        return true;

      } catch(e){ 
        console.log (e)
        return false
      }

    } else {
      return false;
    }
  }

  updateSendForm(wallet_id: number, coin_denom: string){
    
    let result:WalletCoin = {} as WalletCoin;

    result           = this.all_coins[coin_denom];
    result.wallet_id = wallet_id;

    this.selectedWalletCoin.emit(this.all_coins[coin_denom]);
  }

  constructor() {}
  
}