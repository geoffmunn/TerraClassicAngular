import { Component, Inject, inject } from '@angular/core';
import { WalletItemComponent } from '../../wallet-item/wallet-item.component';
import { Wallet } from '../../interfaces/wallet';
import { CommonModule } from '@angular/common';
import { WalletService } from '../../services/wallet.service';
import { NewWalletComponent } from '../new-wallet/new-wallet.component';
import { BalancesService } from '../../services/balances.service';
import { WalletCoin } from '../../interfaces/walletcoin';

import _ from 'lodash';

@Component({
  selector: 'app-wallet-list',
  standalone: true,
  imports: [CommonModule, WalletItemComponent, NewWalletComponent],
  templateUrl: './wallet-list.component.html',
  styleUrl: './wallet-list.component.css'
})

export class WalletListComponent {

  walletService: WalletService = inject(WalletService);
  
  walletList: Wallet[]

  allCoins: { [key: string]: WalletCoin } = {}
  allCoins2: { [key: string]: WalletCoin } = {}
  //allCoins = new Map<String, WalletCoin>()

  //walletBalances: string[] = []
  walletBalances: { [key: string]: any } = {}
  walletBalances2: { [key: string]: any } = {}

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

  private async getWallets(){
    
    //console.log (this.walletList)

    // Get the raw balances for each wallet and attach it to the object
    for (var i = 0; i < this.walletList.length; i++){
      //var i = 8
      console.log ('getting wallet balance for', this.walletList[i].name, '(', this.walletList[i].address, ')')
      var balances:BalancesService = await this.walletService.getBalances(this.walletList[i].address)

      balances.balances.forEach((item:WalletCoin) => {
        this.allCoins2[item.name] = item
      })

      this.walletBalances2[this.walletList[i].name] = _.cloneDeep(balances.balances)
      //this.walletBalances2[this.walletList[i].name] = new BalancesService() 
    }

    console.log('so far:', this.walletBalances2)

    //Now update the allCoins list with a unified set:
    // for (var key in this.walletBalances){
    //   this.walletBalances[key].forEach((item:WalletCoin) => {
    //     this.allCoins[item.name] = item.readable
    //   })
    // }
      
    // Go through each wallet and add any missing coins from the allCoins list
    for (var key in this.walletBalances2){
      //console.log ('balances for', key)
      for (var key2 in this.allCoins2){
        //console.log (this.allCoins2[key2])

        if (!this.walletBalances2[key].has(key2)){
          //console.log (key, 'is missing', key2)

          var coin: WalletCoin = {
            amount: 0,
            name: key2,
            readable: key2
          }

          this.walletBalances2[key].set(key2, coin)
        }
      }
      //console.log(this.walletBalances[key])
    }
    console.log ('wallet balances:', this.walletBalances2)


    console.log ('All done!')
    this.allCoins = this.allCoins2
    this.walletBalances = this.walletBalances2
  }

  private async getList(){
    
    //console.log (this.walletList)

    for (var i = 0; i < this.walletList.length; i++){
      //var i = 8
      console.log ('getting wallet balance for', this.walletList[i].name, '(', this.walletList[i].address, ')')
      var balances:BalancesService = await this.walletService.getBalances(this.walletList[i].address)

      //console.log ('balances from wallet service:', balances)
      //var name: string = String()
      //this.walletBalances[this.walletList[i].name] = balances.balances
      var copied = _.cloneDeep(balances.balances)
      //this.walletBalances[this.walletList[i].name] = _.cloneDeep(balances.balances)

      //console.log (balances.balances.get('uluna'))
      copied.forEach((coin) =>{        

        //this.allCoins.set(coin.name, coin)
        this.allCoins[coin.name] = coin
      })

    }

    console.log ('wallet balances:', this.walletBalances)
  }


  constructor() {

    // Get all the wallets in our localStorage object
    this.walletList = this.walletService.getAllWallets()

    // Get the balance for each wallet
    this.getWallets()

    console.log ('wallet list stuff finished!')
  }
  
}