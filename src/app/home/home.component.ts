import { Component, inject } from '@angular/core';
import { BalancesComponent } from '../balances/balances.component';
import { WalletService } from '../services/wallet.service';
import { WalletListComponent } from '../admin/wallet-list/wallet-list.component';import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BalancesComponent, WalletListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {

  private route: ActivatedRoute = inject(ActivatedRoute);
  private walletService = inject(WalletService);

  constructor(private router: Router,){
    if(this.route.snapshot.url.length > 0){
      const action: string = this.route.snapshot.url[0].path.toLowerCase();
      const wallet_id: number = Number(this.route.snapshot.params['id']);

      console.log ('action:', action)
      console.log ('wallet id:', wallet_id)

      this.walletService.deleteWalletByID(wallet_id)

      this.router.navigate([''])

    }

    
  }
}
