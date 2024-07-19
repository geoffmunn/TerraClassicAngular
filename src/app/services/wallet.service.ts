import { Inject, Injectable } from '@angular/core';
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

  private local_storage: LocalstorageService = new LocalstorageService();
  private terra: LCDClient;
  
  public balances: BalancesService = new BalancesService();
  public key: string = '';
  public wallet_list: Wallet[]     = [];
  
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

    const value: string      = ibc_address.slice(4);
    const chain_name: string = CHAIN_DATA[COIN_CODES.ULUNA]['cosmos_name']
    const uri: string        = 'https://rest.cosmos.directory/' + chain_name + '/ibc/apps/transfer/v1/denom_traces/' + value

    // var result = new RequestService().testtest(uri)
    const denom_name = await new RequestService(this.http).getRequest(uri).then((name) => {
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

  /**
   * Based on the denomination, which will indicate the precision, turn this base uluna amount
   * into the readable number
   * 
   * @param base_amount
   * @param denom 
   * @returns number
   */
  public formatAmountToReadable(base_amount: number, denom: string): number{

    let result: number              = 0
    const default_precision: number = 6

    if (denom in CHAIN_DATA){
      result = Number((base_amount / (10 ** CHAIN_DATA[denom]['precision'])).toFixed(6))
    } else {
      result = Number((base_amount / (10 ** default_precision)).toFixed(6))
    }

    return result
  }

  /**
   * Based on the denomination, which will indicate the precision, turn this readable amount
   * into the base number
   * 
   * @param readable_amount
   * @param denom 
   * @returns number
   */
  public formatAmountToBase(readable_amount: number, denom: string): number{

    let result: number              = 0
    const default_precision: number = 6

    if (denom in CHAIN_DATA){
      result = Number((readable_amount * (10 ** CHAIN_DATA[denom]['precision'])).toFixed(6))
    } else {
      result = Number((readable_amount * (10 ** default_precision)).toFixed(6))
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
    const local_storage  = new LocalstorageService()
    let wallets:Wallet[] = []

    if (local_storage.getData('wallets')){
      const local_wallets = JSON.parse(this.decrypt(local_storage.getData('wallets')!))
        
      if (local_wallets){
        wallets = local_wallets;
      }
    }

    return wallets;
  }

  async getBalances(address: string): Promise<BalancesService> {

    // LCD understand automatically the chain to query using the bech32 prefix of the address
    //const pagOpt:PaginationOptions = Pagination(limit=50, count_total=True)
    const balance:Promise<[Coins, Pagination]> = this.terra.bank.balance(address);

    await balance.then(async (name) => { 
      const coins:Coins = name[0];
      const coin_list   = coins.toData()

      for (var i = 0; i < coin_list.length; i++){
        var denom_result: string = await this.denomTrace(coin_list[i].denom).then ((name) => {
          return name
        })

        if (denom_result != undefined){
          let key              = Object.keys(COIN_CODES).find(key => COIN_CODES[key] === denom_result);
          let formatted_amount = this.formatAmountToReadable(Number(coin_list[i].amount), denom_result)

          if (key !== undefined){
            var coin: WalletCoin = {
              amount: Number(coin_list[i].amount),
              denom: denom_result,
              formatted: formatted_amount,
              readable: FULL_COIN_LOOKUP[key],
              wallet_id: 0
            }

            this.balances.balances.set(denom_result, coin)
          }
        }
      }
    })

    // Get all the meme coins etc
    var keys = Object.keys(NON_ULUNA_COINS)
    for (var i = 0; i < keys.length; i++){
      if (COIN_ALIASES[NON_ULUNA_COINS[keys[i]]] !== undefined){
        var non_uluna_balance:Promise<[Coins, Pagination]> = this.terra.wasm.contractQuery(NON_ULUNA_COINS[keys[i]], {'balance':{'address':address}})  

        await non_uluna_balance.then((item: any) => {
          let formatted_amount = this.formatAmountToReadable(Number(item.balance), COIN_ALIASES[NON_ULUNA_COINS[keys[i]]])
          
          var coin: WalletCoin = {
            amount: Number(item.balance),
            denom: COIN_ALIASES[NON_ULUNA_COINS[keys[i]]],
            formatted: formatted_amount,
            readable: COIN_ALIASES[NON_ULUNA_COINS[keys[i]]],
            wallet_id: 0
          }

          this.balances.balances.set(COIN_ALIASES[NON_ULUNA_COINS[keys[i]]], coin)
        })
      }
    }

    return this.balances
  }

  /**
   * Figure out the next ID number based on existing wallets.
   * This is not a contiguous list - it just looks at the last id
   * 
   * @returns number
   */
  private getNextWalletID(): number {

    let wallet_id: number        = 1
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
  public newWallet(wallet_name: string, wallet_address: string, wallet_seed: string): boolean {
    
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

  }
}
