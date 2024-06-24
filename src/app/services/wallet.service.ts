import { Injectable } from '@angular/core';
import { Wallet } from '../interfaces/wallet';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  walletList: Wallet[] = [
    {
      id: 1,
      name: 'first wallet',
      address: 'terra123',
      seed: 'one two three'
    },
    {
      id: 2,
      name: '2nd wallet',
      address: 'terra456',
      seed: 'four five six'
    },
  ]
  
  getAllWallets(): Wallet[] {
    return this.walletList;
  }
  
  getWalletById(id: number): Wallet | undefined {
    return this.walletList.find((wallet) => wallet.id === id);
  }

  constructor() { }
}
