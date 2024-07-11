import { Component, inject, Input } from '@angular/core';
import { WalletItemComponent } from '../../wallet-item/wallet-item.component';
import { CommonModule } from '@angular/common';
import { WalletService } from '../../services/wallet.service';
import { NewWalletComponent } from '../new-wallet/new-wallet.component';
import { BalancesService } from '../../services/balances.service';
import { WalletCoin } from '../../interfaces/walletcoin';

import _ from 'lodash';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-wallet-list',
  standalone: true,
  imports: [CommonModule, WalletItemComponent, NewWalletComponent, RouterModule],
  templateUrl: './wallet-list.component.html',
  styleUrl: './wallet-list.component.css'
})

export class WalletListComponent {

  public wallet_service: WalletService = inject(WalletService);
  
  public all_coins: { [key: string]: WalletCoin } = {}
  private _all_coins: { [key: string]: WalletCoin } = {}

  public wallet_balances: { [key: string]: any } = {}
  private _wallet_balances: { [key: string]: any } = {}

  @Input() 
    public set password(val: any) {
      if (val != ''){
        this.wallet_service.key = val;
        this.create_list()
      }
    }
    
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
    
    // Get the raw balances for each wallet and attach it to the object
    for (var i = 0; i < this.wallet_service.wallet_list.length; i++){
      var balances:BalancesService = await this.wallet_service.getBalances(this.wallet_service.wallet_list[i].address)

      balances.balances.forEach((item:WalletCoin) => {
        this._all_coins[item.name] = item
      })

      this._wallet_balances[this.wallet_service.wallet_list[i].name] = _.cloneDeep(balances.balances)
    }

    // Go through each wallet and add any missing coins from the allCoins list
    for (var wallet_balance_key in this._wallet_balances){
      for (var all_coins_key in this._all_coins){
        if (!this._wallet_balances[wallet_balance_key].has(all_coins_key)){
          var coin: WalletCoin = {
            amount: 0,
            name: all_coins_key,
            readable: all_coins_key
          }

          this._wallet_balances[wallet_balance_key].set(all_coins_key, coin)
        }
      }
    }
    
    this.all_coins = this._all_coins
    this.wallet_balances = this._wallet_balances
  }

  /**
   * Create the list of wallets and associated balances.
   * The decryption key must have been set prior to this being called.
   */
  public create_list(): boolean {

    if (this.wallet_service.key != '') {
      try {
        // Get all the wallets in our localStorage object
        this.wallet_service.wallet_list = this.wallet_service.getAllWallets()

        //Get the balance for each wallet
        this.get_wallet_balances()

        return true;

      } catch(e){ 
        console.log (e)
        return false
      }

    } else {
      return false;
    }
  }

  constructor() {}
  
}