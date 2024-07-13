import { Component, inject } from '@angular/core';
import { WalletService } from '../services/wallet.service';
import { WalletListComponent } from '../admin/wallet-list/wallet-list.component';
import { WalletPasswordComponent } from '../admin/wallet-password/wallet-password.component';
import { ActivatedRoute, Router } from '@angular/router';
import { SendComponent } from '../transactions/send/send.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [WalletListComponent, WalletPasswordComponent, SendComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {

  private route: ActivatedRoute = inject(ActivatedRoute);
  
  public decryption_password         = '';
  public send_address: string        = '';
  public selected_wallet_id: number  = 0;
  public selected_coin_denom: string = '';

  /**
   * Receive the user password for decrypting the wallet
   * @param $event 
   */
  decryptPassword($event:any){
    console.log ('received a new password!')
    this.decryption_password = $event.password
  }

  selectWalletCoin($event:any){
    console.log ('update the details with this:', $event)
    this.selected_wallet_id = $event.wallet_id
  }

  constructor(private router: Router,){
    if(this.route.snapshot.url.length > 0){
      const action: string = this.route.snapshot.url[0].path.toLowerCase();
      const wallet_id: number = Number(this.route.snapshot.params['id']);

      //console.log ('action:', action)
      //console.log ('wallet id:', wallet_id)

      var walletService = inject(WalletService);

      walletService.deleteWalletByID(wallet_id)

      this.router.navigate([''])

    }
  }
}
