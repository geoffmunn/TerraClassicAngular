import { Injectable } from '@angular/core';
import { WalletCoin } from '../interfaces/walletcoin';

@Injectable({
  providedIn: 'root'
})
export class BalancesService {

  balances: Map<string, WalletCoin>
  //balances: { [key: string]: WalletCoin } = {}

  constructor() { 
    this.balances = new Map<string, WalletCoin>();

  }
}