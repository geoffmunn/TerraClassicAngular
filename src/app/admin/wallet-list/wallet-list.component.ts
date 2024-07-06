import { Component, inject } from '@angular/core';
import { WalletItemComponent } from '../../wallet-item/wallet-item.component';
import { Wallet } from '../../interfaces/wallet';
import { CommonModule } from '@angular/common';
import { WalletService } from '../../services/wallet.service';
import { NewWalletComponent } from '../new-wallet/new-wallet.component';
import { BalancesService } from '../../services/balances.service';
import { WalletCoin } from '../../interfaces/walletcoin';

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

  //allCoins: any = []
  allCoins = new Map<String, WalletCoin>()
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

  private async getList(){
    
    
    //console.log (this.walletList)

    //for (var i = 0; i < this.walletList.length; i++){
      var i = 8
      console.log ('getting wallet balance for', this.walletList[i].name, '(', this.walletList[i].address, ')')
      var balances:BalancesService = await this.walletService.getBalances(this.walletList[i].address)
    
      balances.balances.forEach((coin) =>{        
        this.allCoins.set(coin.name, coin)
      })


  }


  constructor() {

    // Get all the wallets in our localStorage object
    this.walletList = this.walletService.getAllWallets()

    // Get the balance for each wallet
    this.getList()
    
    console.log (this.allCoins)
    console.log ('wallet list stuff finished!')
  }
  
}