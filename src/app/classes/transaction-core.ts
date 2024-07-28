import { LCDClient, MnemonicKey, Wallet } from "@geoffmunn/feather.js";

export class TransactionCore {

    private mk: MnemonicKey | undefined;
    public terra: LCDClient | undefined;
    private seed: string = ''
    
    public wallet:Wallet | undefined
    public chain_id: string = ''

    constructor() {
        this.chain_id = 'columbus-5';
    }

    public create (seed: string) {

        this.seed = seed;

        var config = {
            [this.chain_id]: {
                lcd: 'https://terra-classic-fcd.publicnode.com',
                chainID: this.chain_id,
                gasAdjustment: 1.75,
                gasPrices: { uluna: 0.015 },
                prefix: 'terra', // bech32 prefix, used by the LCD to understand which is the right chain to query
            },
        };
    
        this.terra = new LCDClient(config);

        this.mk = new MnemonicKey({
        mnemonic:
            this.seed
        });

        this.wallet = this.terra.wallet(this.mk);
    }
}
