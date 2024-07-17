export interface WalletCoin {
    amount: number,
    denom: string,
    formatted: number,
    readable: string,
    wallet_id: number           // Technically optional
}
