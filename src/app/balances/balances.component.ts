import { Component } from '@angular/core';
import { LCDClient, Coin, Coins, MnemonicKey } from '@geoffmunn/feather.js';
import { Pagination } from '@geoffmunn/feather.js/dist/client/lcd/APIRequester';
import { RequestService } from '../services/request.service';
import { CHAIN_DATA, COIN_CODES } from '../constants'
import { HttpClient } from '@angular/common/http';
import { BalancesService } from '../services/balances.service';
import { WalletCoin } from '../interfaces/walletcoin';
import { WalletService } from '../services/wallet.service';

@Component({
  selector: 'app-balances',
  standalone: true,
  imports: [],
  templateUrl: './balances.component.html',
  styleUrl: './balances.component.css'
})

export class BalancesComponent {

  balances?: BalancesService;

  async getBalances(address: string){
    var wallet = new WalletService(this.http)

    this.balances = await wallet.getBalances(address)

    console.log ('async finished!')
  }

  constructor(private http: HttpClient){
    
    // Load the balances for this address
    this.getBalances('terra1kgge7tyctna52qfskpkw73xu4fhmd0y29ravr6')

  }
}
