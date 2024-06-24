import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Wallet } from '../interfaces/wallet';

@Component({
  selector: 'app-wallet-item',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './wallet-item.component.html',
  styleUrl: './wallet-item.component.css'
})
export class WalletItemComponent {

  @Input() wallet!: Wallet;

}
