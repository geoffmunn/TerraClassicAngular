import { Component, inject } from '@angular/core';
import { WalletService } from '../services/wallet.service';
import { WalletListComponent } from '../admin/wallet-list/wallet-list.component';
import { WalletPasswordComponent } from '../admin/wallet-password/wallet-password.component';
import { ActivatedRoute, Router } from '@angular/router';
import { SendComponent } from '../transactions/send/send.component';
import { WalletCoin } from '../interfaces/walletcoin';
import { Wallet } from '@geoffmunn/feather.js';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [WalletListComponent, WalletPasswordComponent, SendComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {

  private route: ActivatedRoute = inject(ActivatedRoute);
  
  public decryption_password              = '';
  public send_address: string             = '';
  public selected_wallet_id: number       = 0;
  public selected_wallet_coin: WalletCoin = {} as WalletCoin

  /**
   * Receive the user password for decrypting the wallet
   * @param $event 
   */
  decryptPassword($event:any){
    this.decryption_password = $event.password
  }

  /**
   * This takes the selected coin from the table and passes it to the send component
   * @param $event 
   */
  selectWalletCoin(wallet_coin:WalletCoin){
    this.selected_wallet_coin = wallet_coin;
    this.selected_wallet_id = wallet_coin.wallet_id!;
  }

  constructor(private router: Router,){

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
  }
}
