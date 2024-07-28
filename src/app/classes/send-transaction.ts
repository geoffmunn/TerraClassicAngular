import { Coin, MsgSend } from "@geoffmunn/feather.js";
import { TransactionCore } from "./transaction-core";
import { UserWallet } from "./user-wallet";

export class SendTransaction extends TransactionCore {

    constructor() {
        super();
    }
  
    public simulate(wallet: UserWallet, recipient_address: string, send_amount:Coin ) {
      
      const msg = new MsgSend(
        wallet.address,
        recipient_address,
        send_amount.toJSON()
      )

      this.wallet!
        .createAndSignTx({
            msgs: [msg],
            memo: 'test from feather.js!',
            chainID: this.chain_id, // now here a chainID must be specified
        })
        .then(tx => this.terra!.tx.broadcast(tx, this.chain_id)) // same here
        .then(result => {
            console.log(`TX hash: ${result.txhash}`);
        });
    }
}
