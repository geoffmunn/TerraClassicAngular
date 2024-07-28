export class SendTransaction extends TransactionCore { {

    constructor() {
        super();
    }
  
    public simulate(wallet: UserWallet, recipient_address: string, send_amount:Coin ) {
      
      //let denom:string = send_amount.denom
      //let amount:number = send_amount.amount
  
      const msg = new MsgSend(
        wallet.address,
        recipient_address,
        send_amount.toJSON()
      )
}
