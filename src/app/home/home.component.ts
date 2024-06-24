import { Component } from '@angular/core';
import { BalancesComponent } from '../balances/balances.component';
import { WalletListComponent } from '../admin/wallet-list/wallet-list.component';@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BalancesComponent, WalletListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {

}
