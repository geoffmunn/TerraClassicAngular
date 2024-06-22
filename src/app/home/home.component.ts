import { Component } from '@angular/core';
import { BalancesComponent } from '../balances/balances.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BalancesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {

}
