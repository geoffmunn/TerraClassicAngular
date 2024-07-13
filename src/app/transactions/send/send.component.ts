import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { WalletService } from '../../services/wallet.service';
import { Wallet } from '@geoffmunn/feather.js';

@Component({
  selector: 'app-send',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './send.component.html',
  styleUrl: './send.component.css'
})

export class SendComponent {

  private wallet_service: WalletService = inject(WalletService);

  @Input() 
    public set sendAddress(val: any) {
      if (val != ''){
        this.sendTransactionForm.get('walletSendAddress')?.setValue(val)
      }
    }

  @Input() 
    public set selected_wallet_id(val: any) {
      if (val != ''){
        //this.sendTransactionForm.get('walletSendAddress')?.setValue(val)

        var selected_wallet:any = this.wallet_service.getWalletById(val)
        this.sendTransactionForm.get('walletSendName')?.setValue(selected_wallet.name)
      }
    }

  @Input() 
    public set selected_coin(val: any) {
      if (val != ''){
        //this.sendTransactionForm.get('walletSendAddress')?.setValue(val)
      }
    }
    
  sendTransactionForm = new FormGroup({
    walletSendName: new FormControl(''),
    walletSendAddress: new FormControl(''),
    sendTransactionAmount: new FormControl('', [Validators.max(100), Validators.min(0)]),
  });

  sendTransaction(){

    console.log (this.sendTransactionForm.value.walletSendAddress)
    
  }
}
