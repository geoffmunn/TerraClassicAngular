import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import { WalletService } from '../services/wallet.service';
import { WalletItemComponent } from '../wallet-item/wallet-item.component';
import { Wallet } from '../interfaces/wallet';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';

//import {HousingService} from '../housing.service';
//import {HousingLocation} from '../housinglocation';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})

export class DetailsComponent {

  route: ActivatedRoute = inject(ActivatedRoute);
  walletService = inject(WalletService);
  walletItem: Wallet | undefined;

  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });

  constructor() {
    const walletID = Number(this.route.snapshot.params['id']);
    this.walletItem = this.walletService.getWalletById(walletID);
  }

  submitApplication() {
    this.walletService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? '',
    );
  }
}
