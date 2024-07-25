import { LocalWallet } from '../interfaces/localWallet';
import { LCDClient, Coins, MnemonicKey } from '@geoffmunn/feather.js';
import { Pagination, PaginationOptions } from '@geoffmunn/feather.js/dist/client/lcd/APIRequester';
import { WalletCoin } from '../interfaces/walletCoin';
import { RequestService } from '../services/request.service';
import { CHAIN_DATA, COIN_CODES, FULL_COIN_LOOKUP, NON_ULUNA_COINS, COIN_ALIASES } from '../constants'
import { BalancesService } from '../services/balances.service';
import { LocalStorage } from '../classes/local-storage';

export class UserWallet {

  protected local_storage: LocalStorage   = new LocalStorage();
  private request_service: RequestService | undefined
  private terra: LCDClient;
  
  public balances: BalancesService  = new BalancesService();
  public key: string                = '';
  public wallet_list: LocalWallet[] = [];
  
  /**
   * Based on the provided seed phrase, generate a valid address.
   * The seed needs to be passed as an attribute because it might be user-provided (the 'new wallet' function)
   * 
   * @param seed 
   * 
   * @returns string
   */
  public createAddressFromSeed(seed: string){

    let address: string = ''

    if (seed == ''){
      return ''
    };

    try {
      const mnemonic = new MnemonicKey({
        mnemonic: seed
      });
    
      let wallet = this.terra.wallet(mnemonic);

      address = wallet.key.accAddress('terra')
    } catch(e) {
      address = '';
    };

    return address;
  }

  /**
   * Do a lookup on the IBC value to figure out what the actual readable denom is
   * 
   * @param ibc_address 
   * @returns string
   */
  async denomTrace(ibc_address: string):Promise<string> {
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
    const chain_name: string = CHAIN_DATA[COIN_CODES.ULUNA]['cosmos_name'];
    const uri: string        = 'https://rest.cosmos.directory/' + chain_name + '/ibc/apps/transfer/v1/denom_traces/' + value;

    if (this.request_service != undefined){
      const denom_name = await this.request_service!.getRequest(uri).then((name: any) => {
        return name;
      });

      return denom_name;
    } else {
      return ibc_address;
    }
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

    let result: number              = 0;
    const default_precision: number = 6;

    if (denom in CHAIN_DATA){
      result = Number((base_amount / (10 ** CHAIN_DATA[denom]['precision'])).toFixed(6));
    } else {
      result = Number((base_amount / (10 ** default_precision)).toFixed(6));
    }

    return result;
  }

  /**
   * Based on the denomination, which will indicate the precision, turn this readable amount
   * into the base number
   * 
   * @param readable_amount
   * @param denom 
   * 
   * @returns number
   */
  public formatAmountToBase(readable_amount: number, denom: string): number{

    let result: number              = 0;
    const default_precision: number = 6;

    if (denom in CHAIN_DATA){
      result = Number((readable_amount * (10 ** CHAIN_DATA[denom]['precision'])).toFixed(6));
    } else {
      result = Number((readable_amount * (10 ** default_precision)).toFixed(6));
    }

    return result;
  }

  /**
   * Get all the balances for this address, including contract addresses
   * 
   * @param address 
   * @returns BalancesService
   */
  async getBalances(address: string): Promise<BalancesService> {

    // LCD understand automatically the chain to query using the bech32 prefix of the address
    //const pagOpt:PaginationOptions = Pagination(limit=50, count_total=True)
    const balance:Promise<[Coins, Pagination]> = this.terra.bank.balance(address);

    await balance.then(async (name) => { 
      const coins:Coins = name[0];
      const coin_list   = coins.toData();

      for (var i = 0; i < coin_list.length; i++){
        var denom_result: string = await this.denomTrace(coin_list[i].denom).then ((name) => {
          return name;
        });

        if (denom_result != undefined){
          let key              = Object.keys(COIN_CODES).find(key => COIN_CODES[key] === denom_result);
          let formatted_amount = this.formatAmountToReadable(Number(coin_list[i].amount), denom_result);

          if (key !== undefined){
            var coin: WalletCoin = {
              amount: Number(coin_list[i].amount),
              denom: denom_result,
              formatted: formatted_amount,
              readable: FULL_COIN_LOOKUP[key],
              wallet_id: 0
            };

            this.balances.balances.set(denom_result, coin);
          }
        }
      }
    });

    // Get all the meme coins etc
    const keys = Object.keys(NON_ULUNA_COINS);
    for (var i = 0; i < keys.length; i++){
      if (COIN_ALIASES[NON_ULUNA_COINS[keys[i]]] !== undefined){
        let non_uluna_balance:Promise<[Coins, Pagination]> = this.terra.wasm.contractQuery(NON_ULUNA_COINS[keys[i]], {'balance':{'address':address}})  

        await non_uluna_balance.then((item: any) => {
          let formatted_amount = this.formatAmountToReadable(Number(item.balance), COIN_ALIASES[NON_ULUNA_COINS[keys[i]]])
          
          var coin: WalletCoin = {
            amount: Number(item.balance),
            denom: COIN_ALIASES[NON_ULUNA_COINS[keys[i]]],
            formatted: formatted_amount,
            readable: COIN_ALIASES[NON_ULUNA_COINS[keys[i]]],
            wallet_id: 0
          };

          this.balances.balances.set(COIN_ALIASES[NON_ULUNA_COINS[keys[i]]], coin);
        });
      }
    }

    return this.balances;
  }

  constructor(private rs:RequestService|undefined = undefined) {

    var config = {
      'columbus-5': {
        lcd: 'https://terra-classic-fcd.publicnode.com',
        chainID: 'columbus-5',
        gasAdjustment: 1.75,
        gasPrices: { uluna: 0.015 },
        prefix: 'terra', // bech32 prefix, used by the LCD to understand which is the right chain to query
      },
    };
    
    this.terra = new LCDClient(config);

    this.request_service = rs
  }
}
