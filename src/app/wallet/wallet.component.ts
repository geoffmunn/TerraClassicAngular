import { Component } from '@angular/core';
import { LCDClient, Coin } from '@geoffmunn/feather.js';


@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [],
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.css'
})
export class WalletComponent {

  constructor(){
    // connect to mainnet
    const lcd = LCDClient.fromDefaultConfig('mainnet');

    // get the current balance of `terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v`
    // LCD understand automatically the chain to query using the bech32 prefix of the address
    const balance = lcd.bank.balance(
      'terra1kgge7tyctna52qfskpkw73xu4fhmd0y29ravr6'
    );
    console.log(balance);

    // get the total circulation supply
    // LCD needs a chainID to understand the chain it should query
    const total = lcd.bank.total('columbus-5');
    console.log(total);
  }
}
