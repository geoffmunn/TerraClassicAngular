import { Injectable } from '@angular/core';
import { Address } from '../interfaces/address';
import { LocalstorageService } from './localstorage.service';
import { WalletService } from './wallet.service';

@Injectable({
  providedIn: 'root'
})

export class AddressBookService extends WalletService {

  public address_list: Address[]     = [];

  /**
   * Go through all the addresses and rebuild the list minus the id of the address we don't want.
   * 
   * @param id 
   * @returns boolean
   */
  public deleteAddressByID(id: number): boolean {

    var new_list: Address[] = [];

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
   * Get all the addresses in the local storage object
   * If none exist, return an empty array
   * 
   * @returns array
   */
  public getAllAddresses(): Address[] {

    const local_storage  = new LocalstorageService()
    let addresses: Address[] = []

    if (local_storage.getData('addresses')){
      //console.log (this.decrypt(local_storage.getData('addresses')!))

      //console.log (JSON.parse(this.decrypt(local_storage.getData('addresses')!)))
      const decrypted_string = this.decrypt(local_storage.getData('addresses')!);
      console.log ('decrypted string:', decrypted_string)
      if (decrypted_string != ''){
        const local_addresses = JSON.parse(decrypted_string)
          
        if (local_addresses){
          addresses = local_addresses;
        }
      }
    }

    console.log ('all addresses:', addresses)
    return addresses;
  }

  /**
   * Figure out the next ID number based on existing address book items.
   * This is not a contiguous list - it just looks at the last id
   * 
   * @returns number
   */
  private getNextAddressID(): number {

    let address_id: number        = 1
    let current_addresses:Address[] = this.getAllAddresses();

    if (current_addresses.length > 0){
      address_id = current_addresses.pop()!.id + 1
    }

    return address_id
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

    console.log ('****************')
    console.log ('id:', address_id)
    console.log ('existing addresses:', this.address_list)
    console.log ('current encryption key:', this.key)

    this.address_list.push({'id': address_id, 'name': address_name, 'address': address})    
    this.local_storage.saveData('addresses', this.encrypt(JSON.stringify(this.address_list)))

    console.log ('address list we now have:', this.address_list)
    console.log ('^^^^^^^^^^^^^^^^')
    return true;
  }
}
