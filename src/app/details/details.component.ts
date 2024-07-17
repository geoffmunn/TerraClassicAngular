import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, RouterModule} from '@angular/router';
import { WalletService } from '../services/wallet.service';
import { Wallet } from '../interfaces/wallet';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { PersistablesService } from '../services/persistables.service';

//import {HousingService} from '../housing.service';
//import {HousingLocation} from '../housinglocation';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})

export class DetailsComponent {

  route: ActivatedRoute = inject(ActivatedRoute);
  walletService = inject(WalletService);
  persistables = inject(PersistablesService)

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
    console.log ('persisted password:', this.persistables.decryption_password)
    
    const walletID = Number(this.route.snapshot.params['id']);

    this.walletItem = this.walletService.getWalletById(walletID);
  }
}
