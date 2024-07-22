import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WalletDetailsComponent } from './wallet-details/wallet-details.component';
import { AddressBookDetailsComponent } from './address-book-details/address-book-details.component';

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
        path: 'addresses/:action/:id',
        component: AddressBookDetailsComponent,
        title: 'Address details'
    },
    {
        path: 'addresses',
        component: AddressBookDetailsComponent,
        title: 'New address'
    }

];