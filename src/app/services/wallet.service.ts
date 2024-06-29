import { Injectable } from '@angular/core';
import { Wallet } from '../interfaces/wallet';
import { LocalstorageService } from './localstorage.service';
import CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})

export class WalletService {

  wallet_list: Wallet[] = [];
  local_storage: LocalstorageService = new LocalstorageService();
  key: string = ''

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
   * Get all the wallets in the local storage object
   * If none exist, return an empty array
   * 
   * @returns array
   */
  getAllWallets(): Wallet[] {
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

  /**
   * Figure out the next ID number based on existing wallets.
   * This is not a contiguous list - it just looks at the last id
   * 
   * @returns number
   */
  getNextWalletID(): number {
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
  getWalletById(id: number): Wallet | undefined {
    return this.wallet_list.find((wallet) => wallet.id === id);
  }

  /**
   * DELETE ME
   * @param firstName 
   * @param lastName 
   * @param email 
   */
  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(
      `Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`,
    );
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
  newWallet(wallet_name: string, wallet_address: string, wallet_seed: string): boolean{
    
    const wallet_id: number = this.getNextWalletID();
    this.wallet_list.push({'id': wallet_id, 'name': wallet_name, 'address': wallet_address, 'seed': wallet_seed})    
    this.local_storage.saveData('wallets', this.encrypt(JSON.stringify(this.wallet_list)))

    return true;
  }

  constructor() {
    this.key = 'wallet123'
    // Get the current wallets:
    this.wallet_list = this.getAllWallets()
  }
}
