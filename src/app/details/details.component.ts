import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import { WalletService } from '../services/wallet.service';
import { WalletItemComponent } from '../wallet-item/wallet-item.component';
import { Wallet } from '../interfaces/wallet';

//import {HousingService} from '../housing.service';
//import {HousingLocation} from '../housinglocation';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})

export class DetailsComponent {
  // route: ActivatedRoute = inject(ActivatedRoute);
  // walletID = -1;

  // constructor() {
  //     this.walletID = Number(this.route.snapshot.params['id']);
  // }

  route: ActivatedRoute = inject(ActivatedRoute);
  walletService = inject(WalletService);
  walletItem: Wallet | undefined;
  constructor() {
    const walletID = Number(this.route.snapshot.params['id']);
    this.walletItem = this.walletService.getWalletById(walletID);
  }
}
