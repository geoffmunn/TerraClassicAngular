import { Component } from '@angular/core';
import { LCDClient, Coin, Coins } from '@geoffmunn/feather.js';
import { Pagination } from '@geoffmunn/feather.js/dist/client/lcd/APIRequester';
import { RequestService } from '../services/request.service';
import { CHAIN_DATA } from '../constants'
import { HttpClient } from '@angular/common/http';

//import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';


@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [],
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.css'
})

export class WalletComponent {

  //http: any
  denom: string = 'uluna';

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

  async getBalances(){
    //const lcd = new LCDClient()

    //console.log('config:', CHAIN_DATA.ULUNA)

    // get the current balance of `terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v`
    // LCD understand automatically the chain to query using the bech32 prefix of the address
    const balance:Promise<[Coins, Pagination]> = this.lcd.bank.balance(
      'terra1kgge7tyctna52qfskpkw73xu4fhmd0y29ravr6'
    );


    balance.then(async (name) => { 
      var coins:Coins = name[0];

      var coin_list = coins.toData()

      //console.log(coins.toData())
      for (var i = 0; i < coin_list.length; i++){
        console.log ('getting denom for', coin_list[i].denom)
        var denom_result = await this.denomTrace(coin_list[i].denom).then ((name) => {
          return name
        })

        console.log ('denom:', denom_result, 'amount:', coin_list[i].amount)
      }
    })
  

  }

  constructor(private http: HttpClient){
    // connect to mainnet
    
    //this.http = http
    
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


    this.getBalances()
    
  }
}
