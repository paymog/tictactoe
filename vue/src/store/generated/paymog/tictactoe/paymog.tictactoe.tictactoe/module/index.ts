// THIS FILE IS GENERATED AUTOMATICALLY. DO NOT MODIFY.

import { StdFee } from "@cosmjs/launchpad";
import { SigningStargateClient } from "@cosmjs/stargate";
import { Registry, OfflineSigner, EncodeObject, DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { Api } from "./rest";
import { MsgCreateGame } from "./types/tictactoe/tx";
import { MsgMakeMove } from "./types/tictactoe/tx";
import { MsgStartGame } from "./types/tictactoe/tx";


const types = [
  ["/paymog.tictactoe.tictactoe.MsgCreateGame", MsgCreateGame],
  ["/paymog.tictactoe.tictactoe.MsgMakeMove", MsgMakeMove],
  ["/paymog.tictactoe.tictactoe.MsgStartGame", MsgStartGame],
  
];
export const MissingWalletError = new Error("wallet is required");

export const registry = new Registry(<any>types);

const defaultFee = {
  amount: [],
  gas: "200000",
};

interface TxClientOptions {
  addr: string
}

interface SignAndBroadcastOptions {
  fee: StdFee,
  memo?: string
}

const txClient = async (wallet: OfflineSigner, { addr: addr }: TxClientOptions = { addr: "http://localhost:26657" }) => {
  if (!wallet) throw MissingWalletError;
  let client;
  if (addr) {
    client = await SigningStargateClient.connectWithSigner(addr, wallet, { registry });
  }else{
    client = await SigningStargateClient.offline( wallet, { registry });
  }
  const { address } = (await wallet.getAccounts())[0];

  return {
    signAndBroadcast: (msgs: EncodeObject[], { fee, memo }: SignAndBroadcastOptions = {fee: defaultFee, memo: ""}) => client.signAndBroadcast(address, msgs, fee,memo),
    msgCreateGame: (data: MsgCreateGame): EncodeObject => ({ typeUrl: "/paymog.tictactoe.tictactoe.MsgCreateGame", value: MsgCreateGame.fromPartial( data ) }),
    msgMakeMove: (data: MsgMakeMove): EncodeObject => ({ typeUrl: "/paymog.tictactoe.tictactoe.MsgMakeMove", value: MsgMakeMove.fromPartial( data ) }),
    msgStartGame: (data: MsgStartGame): EncodeObject => ({ typeUrl: "/paymog.tictactoe.tictactoe.MsgStartGame", value: MsgStartGame.fromPartial( data ) }),
    
  };
};

interface QueryClientOptions {
  addr: string
}

const queryClient = async ({ addr: addr }: QueryClientOptions = { addr: "http://localhost:1317" }) => {
  return new Api({ baseUrl: addr });
};

export {
  txClient,
  queryClient,
};
