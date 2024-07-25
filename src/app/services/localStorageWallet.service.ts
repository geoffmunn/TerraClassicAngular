import { Injectable } from '@angular/core';
import { LocalWallet } from '../interfaces/localWallet';
import CryptoJS from 'crypto-js';
import { LocalStorage } from '../classes/local-storage';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageWallet {

  protected local_storage: LocalStorage = new LocalStorage();

  public key: string                = '';
  public wallet_list: LocalWallet[] = [];

  /**
   * Encrypts the provided string based on the stored this.key value
   * 
   * @param encrypted_item 
   * @returns string
   */
  public encrypt(text_item: string): string {

    if (this.key != ''){
      return CryptoJS.AES.encrypt(text_item, this.key).toString();
    } else {
      return '';
    }
  }

  /**
   * Decrypts the provided string based on the stored this.key value
   * 
   * @param encrypted_item 
   * @returns string
   */
  public decrypt(encrypted_item: string) {

    if (this.key != ''){
      return CryptoJS.AES.decrypt(encrypted_item, this.key).toString(CryptoJS.enc.Utf8);
    } else {
      return '';
    };
  }

  /**
   * Go through all the wallets and rebuild the list minus the id of the wallet we don't want.
   * 
   * @param id 
   * @returns boolean
   */
  public deleteWalletByID(id: number): boolean {

    let new_list: LocalWallet[] = [];

    if (this.wallet_list.length == 0){
      this.getAllWallets();
    };

    this.wallet_list.forEach(function(wallet){
      if (wallet.id != id){
        new_list.push(wallet);
      };
    });
    
    this.wallet_list = new_list;
    this.local_storage.saveData('wallets', this.encrypt(JSON.stringify(this.wallet_list)));

    return true;
  }

  /**
   * Get all the wallets in the local storage object.
   * This will also update the wallet_list object.
   * If none exist, return an empty array
   * 
   * @returns array
   */
  public getAllWallets(): LocalWallet[] {

    const local_storage  = new LocalStorage();

    if (local_storage.getData('wallets')){
      let decrypted_string: string = this.decrypt(local_storage.getData('wallets')!);
      if (decrypted_string != ''){
        let local_wallets:any = JSON.parse(decrypted_string);
          
        if (local_wallets){
          this.wallet_list = local_wallets;
        }
      }
    }
    
    return this.wallet_list;
  }

  /**
   * Figure out the next ID number based on existing wallets.
   * This is not a contiguous list - it just looks at the last id
   * 
   * @returns number
   */
  protected getNextWalletID(): number {

    let wallet_id: number             = 1
    let current_wallets:LocalWallet[] = this.getAllWallets();
    
    if (current_wallets.length > 0){
      wallet_id = current_wallets[current_wallets.length - 1].id + 1;
    }

    return wallet_id;
  }

  /**
   * Based on the provided ID, return the wallet that matches
   * 
   * @param id 
   * @returns Wallet or undefined if target does not exist
   */
  public getWalletById(id: number): LocalWallet | undefined {

    if (this.wallet_list.length == 0){
      this.getAllWallets();
    }
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
  public new_wallet(wallet_name: string, wallet_address: string, wallet_seed: string): boolean {
    
    const wallet_id: number = this.getNextWalletID();

    this.wallet_list.push({'id': wallet_id, 'name': wallet_name, 'address': wallet_address, 'seed': wallet_seed});
    this.local_storage.saveData('wallets', this.encrypt(JSON.stringify(this.wallet_list)));

    return true;
  }

  constructor() {}
}