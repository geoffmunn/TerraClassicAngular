import { Component, inject } from '@angular/core';
import { WalletService } from '../services/wallet.service';
import { WalletListComponent } from '../admin/wallet-list/wallet-list.component';
import { ModalWalletPassword } from '../admin/wallet-password/wallet-password.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SendComponent } from '../transactions/send/send.component';
import { WalletCoin } from '../interfaces/walletcoin';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersistablesService } from '../services/persistables.service';
import { AddressBookService } from '../services/address-book.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [WalletListComponent, SendComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {

  private wallet_service: WalletService = inject(WalletService);
  private route: ActivatedRoute         = inject(ActivatedRoute);
  private modalService                  = inject(NgbModal);
  public persistables                   = inject(PersistablesService);

  public decryption_password              = '';
  public selected_wallet_id: number       = 0;
  public selected_wallet_coin: WalletCoin = {} as WalletCoin
  public address_list: string[]           = []

  /**
   * This takes the selected coin from the table and passes it to the send component
   * @param $event 
   */
  selectWalletCoin(wallet_coin:WalletCoin){
    this.selected_wallet_coin = wallet_coin;
    this.selected_wallet_id   = wallet_coin.wallet_id!;

    // Get the addresses that we can send to:
    for (var i = 0; i < this.wallet_service.wallet_list.length; i++){
      this.address_list.push(this.wallet_service.wallet_list[i].address)
    }
  }

  constructor(private router: Router){

    // Check to see if this is a sub-page
    if(this.route.snapshot.url.length > 0){
      const action: string = this.route.snapshot.url[0].path.toLowerCase();
      const wallet_id: number = Number(this.route.snapshot.params['id']);

      // If this is a delete action, then delete the wallet and redirect back to the home page
      if (action == 'delete'){
        var walletService = inject(WalletService);

        walletService.deleteWalletByID(wallet_id);

        this.router.navigate(['']);
      }
    }

    if (this.persistables.decryption_password == ''){
      const test = this.modalService.open(ModalWalletPassword);

      test.result.then(() => {
        this.decryption_password = test.componentInstance.walletPassword.value.walletPassword
        this.persistables.decryption_password = this.decryption_password
      }, 
      () => { 
        // Do nothing, it was cancelled
        console.log('Backdrop click')
      });
    } else {
      this.decryption_password = this.persistables.decryption_password
    }
  }
}