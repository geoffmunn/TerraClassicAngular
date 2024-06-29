import { Component, inject } from '@angular/core';
import { WalletItemComponent } from '../../wallet-item/wallet-item.component';
import { Wallet } from '../../interfaces/wallet';
import { CommonModule } from '@angular/common';
import { WalletService } from '../../services/wallet.service';
import { NewWalletComponent } from '../new-wallet/new-wallet.component';
@Component({
  selector: 'app-wallet-list',
  standalone: true,
  imports: [CommonModule, WalletItemComponent, NewWalletComponent],
  templateUrl: './wallet-list.component.html',
  styleUrl: './wallet-list.component.css'
})

export class WalletListComponent {

  walletService: WalletService = inject(WalletService);
  
  walletList: Wallet[]

  filteredWalletList: Wallet[] = [];

  filterResults(text: string) {
    if (!text) {
      this.filteredWalletList = this.walletList;
      return;
    }
    this.filteredWalletList = this.walletList.filter((walletItem) =>
      walletItem?.name.toLowerCase().includes(text.toLowerCase()),
    );
  }

  constructor() {
    this.walletList = this.walletService.getAllWallets();
    this.filteredWalletList = this.walletList;
  }
  
}