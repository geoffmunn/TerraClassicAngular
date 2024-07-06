import { Injectable } from '@angular/core';
import { Wallet } from '../interfaces/wallet';
import { LocalstorageService } from './localstorage.service';
import CryptoJS from 'crypto-js';
import { LCDClient, Coin, Coins, MnemonicKey } from '@geoffmunn/feather.js';
import { Pagination, PaginationOptions } from '@geoffmunn/feather.js/dist/client/lcd/APIRequester';
import { WalletCoin } from '../interfaces/walletcoin';
import { RequestService } from './request.service';
import { CHAIN_DATA, COIN_CODES, FULL_COIN_LOOKUP, NON_ULUNA_COINS, COIN_ALIASES } from '../constants'
import { BalancesService } from './balances.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class WalletService {

  wallet_list: Wallet[] = [];
  local_storage: LocalstorageService = new LocalstorageService();
  key: string = '';
  terra: LCDClient;
  balances: BalancesService = new BalancesService();
  
  public createAddressFromSeed(seed: string){

    var address: string = ''

    if (seed == ''){
      return ''
    }

    try {
      var mnemonic = new MnemonicKey({
        mnemonic: seed
      });
    
      var wallet = this.terra.wallet(mnemonic);

      console.log(wallet.key.accAddress('terra'))

      address = wallet.key.accAddress('terra')
    } catch(e) {
      address = '';
    }

    return address
  }

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
    //erc20Tokens[key as keyof typeof erc20Tokens]
    // const test = (key: string) => {
    //   console.log(erc20Tokens[key as keyof IERC20Tokens]);
    // };
    
    // test('dai');
    
    var value: string = ibc_address.slice(4);
    //var chain_name: string = CHAIN_DATA['uluna' as keyof COIN_CODES]['cosmos_name']
    var chain_name: string = CHAIN_DATA[COIN_CODES.ULUNA]['cosmos_name']
    var uri: string        = 'https://rest.cosmos.directory/' + chain_name + '/ibc/apps/transfer/v1/denom_traces/' + value

    // var result = new RequestService().testtest(uri)
    var denom_name = await new RequestService(this.http).getRequest(uri).then((name) => {
      return name;
    });


    return denom_name;
  }

  /**
   * Encrypts the provided string based on the stored this.key value
   * 
   * @param encrypted_item 
   * @returns string
   */
  public encrypt(text_item: string): string {
    return CryptoJS.AES.encrypt(text_item, this.key).toString();
  }

  /**
   * Decrypts the provided string based on the stored this.key value
   * 
   * @param encrypted_item 
   * @returns string
   */
  public decrypt(encrypted_item: string) {
      return CryptoJS.AES.decrypt(encrypted_item, this.key).toString(CryptoJS.enc.Utf8);
  }

  /**
   * Go through all the wallets and rebuild the list minus the id of the wallet we don't want.
   * 
   * @param id 
   * @returns boolean
   */
  public deleteWalletByID(id: number): boolean {

    var new_list: Wallet[] = [];

    this.wallet_list.forEach(function(wallet){
      if (wallet.id != id){
        new_list.push(wallet);
      }
    })
    
    this.wallet_list = new_list;
    this.local_storage.saveData('wallets', this.encrypt(JSON.stringify(this.wallet_list)));

    return true;
  }

  private formatAmount(amount: number, denom: string): number{

    var result: number = 0
    const default_precision: number = 6

    if (denom in CHAIN_DATA){
      result = Number((amount / (CHAIN_DATA[denom]['precision'] ** 10)).toFixed(6))
    } else {
      result = Number((amount / (default_precision ** 10)).toFixed(6))
    }

    return result
  }

  /**
   * Get all the wallets in the local storage object
   * If none exist, return an empty array
   * 
   * @returns array
   */
  public getAllWallets(): Wallet[] {
    let local_storage = new LocalstorageService()
    let wallets:Wallet[] = []

    if (local_storage.getData('wallets')){
      let local_wallets = JSON.parse(this.decrypt(local_storage.getData('wallets')!))
        
      if (local_wallets){
        wallets = local_wallets;
      }
    }

    return wallets;
  }

  async testx(address: string){
    let non_uluna_balance:Promise<[Coins, Pagination]> = this.terra.wasm.contractQuery('terra1vhgq25vwuhdhn9xjll0rhl2s67jzw78a4g2t78y5kz89q9lsdskq2pxcj2', {'balance':{'address':address}})  

    console.log ('non uluna balance: ', non_uluna_balance)
    await non_uluna_balance.then((name) => {
      var coin: WalletCoin = {
        amount: 123456,
        name: 'rakoff',
        readable: 'RAKOFF'
      }

      this.balances.balances.set('rakoff', coin)
    })
  }
  
  async testtest(address: string) {
    // Object.entries(NON_ULUNA_COINS).forEach(([key, value], index) => {
    //   // Cast the value to a string
    //   let val:string = String(value)
    //   //console.log(key, value, index);
    //   const non_uluna_balance:Promise<[Coins, Pagination]> = this.terra.wasm.contractQuery(val, {'balance':{'address':address}})  

    //   non_uluna_balance.then(async (name) => { 

    //     var item: any = name
    //     let formatted_amount = this.formatAmount(Number(item.balance), COIN_ALIASES[val])

    //     console.log ('discovered:', COIN_ALIASES[val], formatted_amount)
    //     var coin: WalletCoin = {
    //       amount: formatted_amount,
    //       name: val,
    //       readable: COIN_ALIASES[val]
    //     }

    //     this.balances.balances.set(val, coin)

    //   });

    //   //const balance:Promise<[Coins, Pagination]> = this.terra.bank.balance(address);

    //   //await balance.then(async (name) => { 

      
    // });

    //Object.entries(NON_ULUNA_COINS).forEach(async ([key, value], index) => {
    //Object.entries(NON_ULUNA_COINS).forEach(async ([key, value], index) => {
      //await this.testx(address)
    let non_uluna_balance:Promise<[Coins, Pagination]> = this.terra.wasm.contractQuery('terra1vhgq25vwuhdhn9xjll0rhl2s67jzw78a4g2t78y5kz89q9lsdskq2pxcj2', {'balance':{'address':address}})  

    non_uluna_balance.then(async(item) => { 
      console.log (item)
      var coin: WalletCoin = {
        amount: 123456,
        name: 'rakoff',
        readable: 'RAKOFF'
      }

      this.balances.balances.set('rakoff', coin)
    })
    //});
    
    //console.log ('test:', non_uluna_balance)
    return this.balances
  }

  async getBalances(address: string): Promise<BalancesService> {
  //getBalances(address: string): BalancesService {

    // LCD understand automatically the chain to query using the bech32 prefix of the address
    //const pagOpt:PaginationOptions = Pagination(limit=50, count_total=True)
    const balance:Promise<[Coins, Pagination]> = this.terra.bank.balance(address);

    await balance.then(async (name) => { 
      var coins:Coins = name[0];

      var coin_list = coins.toData()

      for (var i = 0; i < coin_list.length; i++){
        var denom_result: string = await this.denomTrace(coin_list[i].denom).then ((name) => {
          return name
        })

        let key = Object.keys(COIN_CODES).find(key => COIN_CODES[key] === denom_result);
        let formatted_amount = this.formatAmount(Number(coin_list[i].amount), denom_result)

        //if (formatted_amount != 0){
        if (key !== undefined){
          var coin: WalletCoin = {
            amount: formatted_amount,
            name: denom_result,
            readable: FULL_COIN_LOOKUP[key]
          }

          this.balances.balances.set(denom_result, coin)
        }
        //}  
      }
    })


    //this.testtest(address)
    var keys = Object.keys(NON_ULUNA_COINS)
    console.log ('keys:', keys)
    //Object.entries(NON_ULUNA_COINS).forEach(async ([key, value], index) => {
    for (var i = 0; i < keys.length; i++){
      console.log ('hi')
      console.log ('key address:', NON_ULUNA_COINS[keys[i]])
      console.log ('coin alias:', COIN_ALIASES[NON_ULUNA_COINS[keys[i]]])
      var non_uluna_balance:Promise<[Coins, Pagination]> = this.terra.wasm.contractQuery(NON_ULUNA_COINS[keys[i]], {'balance':{'address':address}})  

      console.log ('non uluna balance: ', non_uluna_balance)
      await non_uluna_balance.then((name) => {
        var coin: WalletCoin = {
          amount: 123456,
          name: COIN_ALIASES[NON_ULUNA_COINS[keys[i]]],
          readable: COIN_ALIASES[NON_ULUNA_COINS[keys[i]]]
        }

        this.balances.balances.set(COIN_ALIASES[NON_ULUNA_COINS[keys[i]]], coin)
      })

      // var non_uluna_balance:Promise<[Coins, Pagination]> = this.terra.wasm.contractQuery('terra1vhgq25vwuhdhn9xjll0rhl2s67jzw78a4g2t78y5kz89q9lsdskq2pxcj2', {'balance':{'address':address}})  

      // console.log ('non uluna balance: ', non_uluna_balance)
      // await non_uluna_balance.then((name) => {
      //   var coin: WalletCoin = {
      //     amount: 123456,
      //     name: 'rakoff',
      //     readable: 'RAKOFF'
      //   }

      //   this.balances.balances.set('rakoff', coin)
      // })

      // var non_uluna_balance:Promise<[Coins, Pagination]> = this.terra.wasm.contractQuery('terra13d6xlk4d6cfa6c5c7n2ffua5d5fk5ggfq8vsxr34xnxr07nmke0qajzu8y', {'balance':{'address':address}})  

      // console.log ('non uluna balance: ', non_uluna_balance)
      // await non_uluna_balance.then((name) => {
      //   var coin: WalletCoin = {
      //     amount: 123456,
      //     name: 'elon',
      //     readable: 'ELON'
      //   }

      //   this.balances.balances.set('elon', coin)
      // })
    }
      //this.testx(address)
    //});


    // non_uluna_balance.then((item) => { 
    //   console.log (item)
    //   var coin: WalletCoin = {
    //     amount: 123456,
    //     name: 'rakoff',
    //     readable: 'RAKOFF'
    //   }

    //   this.balances.balances.set('rakoff', coin)
    // })


    // Now get the non-uluna coins:
    //console.log ('coin aliases:', COIN_ALIASES)
    // Object.entries(NON_ULUNA_COINS).forEach(([key, value], index) => {
    //   // Cast the value to a string
    //   let val:string = String(value)
    //   //console.log(key, value, index);
    //   const non_uluna_balance:Promise<[Coins, Pagination]> = this.terra.wasm.contractQuery(val, {'balance':{'address':address}})  

    //   non_uluna_balance.then(async (name) => { 

    //     var item: any = name
    //     let formatted_amount = this.formatAmount(Number(item.balance), COIN_ALIASES[val])

    //     //console.log ('discovered:', COIN_ALIASES[val], formatted_amount)
    //     var coin: WalletCoin = {
    //       amount: formatted_amount,
    //       name: val,
    //       readable: COIN_ALIASES[val]
    //     }

    //     this.balances.balances.set(val, coin)

    //   });

    //   //const balance:Promise<[Coins, Pagination]> = this.terra.bank.balance(address);

    //   //await balance.then(async (name) => { 

    // });
    

    // NON_ULUNA_COINS.forEach(function(item:string){
    //   console.log('non uluna item:', item)
    // })
    //var coin_balance = this.terra.wasm.contractQuery(coin_address, {'balance':{'address':self.address}})  


    console.log ('balances at end: ', this.balances)
    return this.balances
  }

  /**
   * Figure out the next ID number based on existing wallets.
   * This is not a contiguous list - it just looks at the last id
   * 
   * @returns number
   */
  private getNextWalletID(): number {
    let wallet_id: number = 1

    let current_wallets:Wallet[] = this.getAllWallets();

    if (current_wallets.length > 0){
      wallet_id = current_wallets.pop()!.id + 1
    }

    return wallet_id
  }

  /**
   * Based on the provided ID, return the wallet that matches
   * 
   * @param id 
   * @returns Wallet or undefined if target does not exist
   */
  public getWalletById(id: number): Wallet | undefined {
    return this.wallet_list.find((wallet) => wallet.id === id);
  }

  /**
   * Add a new wallet to the list, and update the local storage object.
   * 
   * @param wallet_name 
   * @param wallet_address 
   * @param wallet_seed 
   * 
   * @return true
   */
  public newWallet(wallet_name: string, wallet_address: string, wallet_seed: string): boolean{
    
    const wallet_id: number = this.getNextWalletID();
    this.wallet_list.push({'id': wallet_id, 'name': wallet_name, 'address': wallet_address, 'seed': wallet_seed})    
    this.local_storage.saveData('wallets', this.encrypt(JSON.stringify(this.wallet_list)))

    return true;
  }

  constructor(private http: HttpClient) {

    var config = {
      'columbus-5': {
        lcd: 'https://terra-classic-fcd.publicnode.com',
        chainID: 'columbus-5',
        gasAdjustment: 1.75,
        gasPrices: { uluna: 0.015 },
        prefix: 'terra', // bech32 prefix, used by the LCD to understand which is the right chain to query
      },
    }
    
    this.terra = new LCDClient(config)

    this.key = 'wallet123'

    // Get the current wallets:
    this.wallet_list = this.getAllWallets()
  }

}
