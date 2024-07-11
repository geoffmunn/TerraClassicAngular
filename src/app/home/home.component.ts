import { Component, inject } from '@angular/core';
import { WalletService } from '../services/wallet.service';
import { WalletListComponent } from '../admin/wallet-list/wallet-list.component';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [WalletListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {

  private route: ActivatedRoute = inject(ActivatedRoute);
  
  public decryption_password = 'wallet123'

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
