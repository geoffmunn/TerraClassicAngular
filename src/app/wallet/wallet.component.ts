import { Component } from '@angular/core';
import { LCDClient, Coin, Coins } from '@geoffmunn/feather.js';
import { Pagination } from '@geoffmunn/feather.js/dist/client/lcd/APIRequester';
import { RequestService } from '../services/request.service';
import { CHAIN_DATA } from '../constants'
import { HttpClient } from '@angular/common/http';
import { BalancesService } from '../services/balances.service';
import { WalletCoin } from '../interfaces/walletcoin';
@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [],
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.css'
})

export class WalletComponent {

  address: string = '';
  denom: string = 'uluna';
  balances: BalancesService;

  lcd: LCDClient;

  async denomTrace(ibc_address: string) {
      // """
      // Based on the wallet prefix, get the IBC denom trace details for this IBC address.
      // This is a slow process, so we do two things:
      // First, check the cached results in memory.
      // Second, check the database.
      // Third, go and get the actual result.
      
      // @params:
      //     - ibc_address: the full address - should start with ibc/
          
      // @return: the string-based denomination that this resolves to
      // """

      // First, if this is not even an IBC address, then return the original value:
      if (ibc_address.slice(0,4).toLowerCase() != 'ibc/'){
        return ibc_address;
      }

      // We will use the uri as the key, just to make sure there are no collisions
      var value: string = ibc_address.slice(4);
      var chain_name: string = CHAIN_DATA['ULUNA']['cosmos_name']
      var uri: string        = 'https://rest.cosmos.directory/' + chain_name + '/ibc/apps/transfer/v1/denom_traces/' + value

      // var result = new RequestService().testtest(uri)
      var denom_name = await new RequestService(this.http).getRequest(uri).then((name) => {
        return name;
      });


      return denom_name;
  }

  async getBalances(address: string): Promise<boolean> {

    // LCD understand automatically the chain to query using the bech32 prefix of the address
    const balance:Promise<[Coins, Pagination]> = this.lcd.bank.balance(address);

    await balance.then(async (name) => { 
      var coins:Coins = name[0];

      var coin_list = coins.toData()

      for (var i = 0; i < coin_list.length; i++){
        var denom_result: string = await this.denomTrace(coin_list[i].denom).then ((name) => {
          return name
        })

        var coin: WalletCoin = {
          amount: Number(coin_list[i].amount),
          name: denom_result,
          readable: 'bitcoin'
        }

        this.balances.balances.set(denom_result, coin)
      }
    })
  
    return true
  }

  constructor(private http: HttpClient){
    // connect to mainnet
    
    var config = {
      'columbus-5': {
        lcd: 'https://terra-classic-fcd.publicnode.com',
        chainID: 'columbus-5',
        gasAdjustment: 1.75,
        gasPrices: { uluna: 0.015 },
        prefix: 'terra', // bech32 prefix, used by the LCD to understand which is the right chain to query
      },
    }
    this.lcd = new LCDClient(config)

    this.address = 'terra1kgge7tyctna52qfskpkw73xu4fhmd0y29ravr6';

    // Instantiate a balance object
    this.balances = new BalancesService()

    // Load the balances for this address
    this.getBalances(this.address);
    
  }
}
