import { Fee, LCDClient, MnemonicKey, Wallet } from "@geoffmunn/feather.js";
import { TaxRateResponse } from "@geoffmunn/feather.js/dist/client/lcd/api/TreasuryAPI";

// export interface GasPrice {
//     denom: 'uluna'
// }

export class TransactionCore {

    private mk: MnemonicKey | undefined;
    
    private seed: string = ''
    
    public terra: LCDClient | undefined;
    public wallet:Wallet | undefined
    public chain_id: string = ''

    public fee: Fee | undefined
    public gas_adjustment: number = this.getGasAdjustment()
    public gas_prices = this.getGasPrices()
    
    protected tax_rate: number = 0;

    constructor() {
        this.chain_id = 'columbus-5';
    }

    public create (seed: string) {

        this.seed = seed;

        // // Get the tax rate
        // this.setTaxRate()

        // // Get the gas prices
        // this.setGasPrices()

        var config = {
            [this.chain_id]: {
                lcd: 'https://terra-classic-fcd.publicnode.com',
                chainID: this.chain_id,
                gasAdjustment: this.gas_adjustment,
                gasPrices: this.gas_prices,
                prefix: 'terra', // bech32 prefix, used by the LCD to understand which is the right chain to query
            },
        };
    
        // Set up a few basic values
        this.terra = new LCDClient(config);
        this.mk = new MnemonicKey({mnemonic: this.seed});
        this.wallet = this.terra.wallet(this.mk);
    }

    protected getGasAdjustment(){

        return 1.75;
    }

    protected getGasPrices(){

        return {'uluna': '28.325'}
    }

    protected async setTaxRate() {

        const result:TaxRateResponse = await this.terra!.treasury.taxRate(this.chain_id)
        
        this.tax_rate = result.tax_rate;
    }
}
