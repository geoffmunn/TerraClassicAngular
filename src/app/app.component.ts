import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WalletComponent } from './wallet/wallet.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WalletComponent],
  template: `
    <router-outlet />
    <app-wallet></app-wallet>
  `,
  styles: [],
})
export class AppComponent {
  title = 'Terra Classic on Angular';
}
