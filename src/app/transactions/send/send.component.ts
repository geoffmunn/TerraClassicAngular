import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { WalletService } from '../../services/wallet.service';
import { Wallet } from '@geoffmunn/feather.js';
import { WalletCoin } from '../../interfaces/walletcoin';
import { Transaction } from '../../interfaces/transaction';

@Component({
  selector: 'app-send',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './send.component.html',
  styleUrl: './send.component.css'
})

export class SendComponent {

  private wallet_service: WalletService = inject(WalletService);

  private wallet: Wallet   = {} as Wallet;
  private coin: WalletCoin = {} as WalletCoin;

  public sendMax: number = 0;
  public send75: number  = 0;
  public send50: number  = 0;
  public send25: number  = 0;

  @Input() 
    public set selected_wallet_id(val: number) {
      if (val !== undefined){
        var selected_wallet:any = this.wallet_service.getWalletById(val)

        if (selected_wallet !== undefined){
          this.sendTransactionForm.get('walletSendName')?.setValue(selected_wallet.name)
          this.wallet = selected_wallet;
        }
      }
    }

    @Input() 
    public set selected_wallet_coin(val: WalletCoin) {
     if ('denom' in val){
        this.coin = val;

        this.sendMax = this.coin.formatted;
        this.send75  = this.coin.formatted * 0.75;
        this.send50  = this.coin.formatted * 0.5;
        this.send25  = this.coin.formatted * 0.25;
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

  /**
   * Using the provided transaction amount, update the form with the percentage amount.
   * @param percentage
   */
  populateAmount(transaction: Transaction){
    const amount:string = String(this.coin.formatted * Number(transaction.percentage));

    this.sendTransactionForm.get('sendTransactionAmount')?.setValue(amount)
  }
}
