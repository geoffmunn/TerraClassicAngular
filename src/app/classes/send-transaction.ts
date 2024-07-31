import { Coin, Coins, Fee, MsgSend, Tx } from "@geoffmunn/feather.js";
import { TransactionCore } from "./transaction-core";
import { UserWallet } from "./user-wallet";

import { CreateTxOptions } from "@geoffmunn/feather.js";
export class SendTransaction extends TransactionCore {

    constructor() {
        super();
    }
  
    public async simulate(wallet: UserWallet, recipient_address: string, send_amount:Coin ): Promise<SendTransaction> {
      
        const msgs = [new MsgSend(
            wallet.address,
            recipient_address,
            send_amount.toString()
        )]

        const tx:Tx = await this.wallet!.createAndSignTx({ msgs, chainID: this.chain_id }).then((result:Tx) => {
            return result;
        });

        this.fee = tx.auth_info.fee;

        return this;
    }
}
