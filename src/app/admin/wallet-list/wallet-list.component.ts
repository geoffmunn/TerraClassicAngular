import { Component, inject } from '@angular/core';
import { WalletItemComponent } from '../../wallet-item/wallet-item.component';
import { Wallet } from '../../interfaces/wallet';
import { CommonModule } from '@angular/common';
import { WalletService } from '../../services/wallet.service';
@Component({
  selector: 'app-wallet-list',
  standalone: true,
  imports: [CommonModule, WalletItemComponent],
  templateUrl: './wallet-list.component.html',
  styleUrl: './wallet-list.component.css'
})
export class WalletListComponent {

  walletService: WalletService = inject(WalletService);
  
  walletList: Wallet[]

  constructor() {
    this.walletList = this.walletService.getAllWallets();
  }
  
}