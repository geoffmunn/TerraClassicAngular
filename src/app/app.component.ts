import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BalancesComponent } from './balances/balances.component';
import { HomeComponent } from './home/home.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent],
  template: `
    <main>
      <header class="brand-name">
        <img class="brand-logo" src="/assets/logo.svg" alt="logo" aria-hidden="true" />
      </header>
      <section class="content">
        <app-home></app-home>
      </section>
    </main>
  `,
  styles: [],
})
export class AppComponent {
  title = 'Terra Classic on Angular';
}
