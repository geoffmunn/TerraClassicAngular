import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, RouterModule} from '@angular/router';
import { WalletService } from '../services/wallet.service';
import { Wallet } from '../interfaces/wallet';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { PersistablesService } from '../services/persistables.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})

export class DetailsComponent {

  route: ActivatedRoute = inject(ActivatedRoute);
  walletService         = inject(WalletService);
  persistables          = inject(PersistablesService)

  walletItem: Wallet | undefined;

  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });

  /**
   * Based on the ID in the URL, get the wallet that matches it.
   */
  constructor() {    
    const walletID = Number(this.route.snapshot.params['id']);
    this.walletItem = this.walletService.getWalletById(walletID);
  }
}
