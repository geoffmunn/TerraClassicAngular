import { Inject, Injectable } from '@angular/core';
// import { Wallet } from '../interfaces/wallet';
// import { LocalstorageService } from './localstorage.service';
// import CryptoJS from 'crypto-js';
// import { LCDClient, Coin, Coins, MnemonicKey } from '@geoffmunn/feather.js';
// import { Pagination, PaginationOptions } from '@geoffmunn/feather.js/dist/client/lcd/APIRequester';
// import { WalletCoin } from '../interfaces/walletcoin';
// import { RequestService } from './request.service';
// import { CHAIN_DATA, COIN_CODES, FULL_COIN_LOOKUP, NON_ULUNA_COINS, COIN_ALIASES } from '../constants'
// import { BalancesService } from './balances.service';
// import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class PersistablesService {

  decryption_password: string = ''
  address_book: string[] = []
  
}
