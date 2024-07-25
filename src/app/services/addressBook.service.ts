import { Injectable } from '@angular/core';
import { Address } from '../interfaces/address';
import { LocalStorage } from '../classes/local-storage';
import { LocalStorageWallet } from './localStorageWallet.service';

@Injectable({
  providedIn: 'root'
})

export class AddressBookService extends LocalStorageWallet {

  public address_list: Address[] = [];

  /**
   * Go through all the address book items and rebuild the list minus the id of the address we don't want.
   * 
   * @param id 
   * @returns boolean
   */
  public deleteAddressByID(id: number): boolean {

    var new_list: Address[] = [];

    if (this.address_list.length == 0){
      this.getAllAddresses();
    }

    this.address_list.forEach(function(address){
      if (address.id != id){
        new_list.push(address);
      }
    })
    
    this.address_list = new_list;
    this.local_storage.saveData('addresses', this.encrypt(JSON.stringify(this.address_list)));

    return true;
  }

  /**
   * Get all the addresses in the local storage object.
   * This will also update the address_list object.
   * If none exist, return an empty array
   * 
   * @returns array
   */
  public getAllAddresses(): Address[] {

    const local_storage = new LocalStorage();

    if (local_storage.getData('addresses')){
      let decrypted_string: string = this.decrypt(local_storage.getData('addresses')!);
      if (decrypted_string != ''){
        let local_addresses:any = JSON.parse(decrypted_string);
          
        if (local_addresses){
          this.address_list = local_addresses;
        }
      }
    }
    
    return this.address_list;
  }

  /**
   * Figure out the next ID number based on existing addresses.
   * This is not a contiguous list - it just looks at the last id
   * 
   * @returns number
   */
  private getNextAddressID(): number {

    let address_id: number          = 1
    let current_addresses:Address[] = this.getAllAddresses();
    
    if (current_addresses.length > 0){
      address_id = current_addresses[current_addresses.length - 1].id + 1;
    }

    return address_id;
  }

  /**
   * Based on the provided ID, return the address that matches
   * 
   * @param id 
   * @returns Address or undefined if target does not exist
   */
  public getAddressById(id: number): Address | undefined {

    return this.address_list.find((address) => address.id === id);
  }

  /**
   * Add a new address to the address book, and update the local storage object.
   * 
   * @param address_name 
   * @param address 
   * 
   * @return true
   */
  public newAddress(address_name: string, address: string): boolean {
    
    const address_id: number = this.getNextAddressID();

    this.address_list.push({'id': address_id, 'name': address_name, 'address': address});
    this.local_storage.saveData('addresses', this.encrypt(JSON.stringify(this.address_list)));

    return true;
  }
}
