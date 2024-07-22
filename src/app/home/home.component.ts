import { Component, inject } from '@angular/core';
import { WalletService } from '../services/wallet.service';
import { WalletListComponent } from '../admin/wallet-list/wallet-list.component';
import { ModalWalletPassword } from '../admin/wallet-password/wallet-password.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SendComponent } from '../transactions/send/send.component';
import { WalletCoin } from '../interfaces/walletcoin';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersistablesService } from '../services/persistables.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [WalletListComponent, SendComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {

  private wallet_service: WalletService   = inject(WalletService);
  private modal_service:NgbModal          = inject(NgbModal);
  public persistables:PersistablesService = inject(PersistablesService);

  public decryption_password: string      = '';
  public selected_wallet_id: number       = 0;
  public selected_wallet_coin: WalletCoin = {} as WalletCoin;
  public address_list: string[]           = [];

  /**
   * This takes the selected coin from the table and passes it to the send component
   * @param $event 
   */
  selectWalletCoin(wallet_coin:WalletCoin){
    this.selected_wallet_coin = wallet_coin;
    this.selected_wallet_id   = wallet_coin.wallet_id!;

    // Get the addresses that we can send to:
    for (var i = 0; i < this.wallet_service.wallet_list.length; i++){
      this.address_list.push(this.wallet_service.wallet_list[i].address);
    }
  }

  constructor(){

    if (this.persistables.decryption_password == ''){
      const model_password = this.modal_service.open(ModalWalletPassword);

      model_password.result.then(() => {
        this.decryption_password              = model_password.componentInstance.walletPassword.value.walletPassword;
        this.persistables.decryption_password = this.decryption_password;
      }, 
      () => { 
        // Do nothing, it was cancelled
        console.log('Backdrop click')
      });
    } else {
      this.decryption_password = this.persistables.decryption_password;
    }
  }
}