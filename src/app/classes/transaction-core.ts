export class TransactionCore {

    private mk: MnemonicKey | undefined;
  private terra: LCDClient | undefined;
  private seed: string = ''

  constructor() {}

  public create (seed: string) {

    this.seed = seed;

    var config = {
      'columbus-5': {
        lcd: 'https://terra-classic-fcd.publicnode.com',
        chainID: 'columbus-5',
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
  }
}
