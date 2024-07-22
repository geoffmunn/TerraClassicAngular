import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WalletDetailsComponent } from './wallet-details/wallet-details.component';
import { NewWalletComponent } from './admin/new-wallet/new-wallet.component';
import { AddressBookComponent } from './admin/address-book/address-book.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home page',
    },
    {
        path: 'wallets/:action/:id',
        component: WalletDetailsComponent,
        title: 'Wallet details',
    },
    {
        path: 'wallets',
        component: WalletDetailsComponent,
        title: 'Wallet details',
    },
    {
        path: 'addresses',
        component: AddressBookComponent,
        title: 'New address'
    }

];