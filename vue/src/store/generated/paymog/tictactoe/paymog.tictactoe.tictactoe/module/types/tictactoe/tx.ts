/* eslint-disable */
import { Reader, Writer } from "protobufjs/minimal";
import { Game } from "../tictactoe/game";

export const protobufPackage = "paymog.tictactoe.tictactoe";

export interface MsgCreateGame {
  creator: string;
}

export interface MsgCreateGameResponse {
  game: Game | undefined;
}

export interface MsgStartGame {
  creator: string;
  id: string;
}

export interface MsgStartGameResponse {
  game: Game | undefined;
}

export interface MsgMakeMove {
  creator: string;
  id: string;
  row: string;
  col: string;
}

export interface MsgMakeMoveResponse {
  game: Game | undefined;
}

const baseMsgCreateGame: object = { creator: "" };

export const MsgCreateGame = {
  encode(message: MsgCreateGame, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgCreateGame {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgCreateGame } as MsgCreateGame;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateGame {
    const message = { ...baseMsgCreateGame } as MsgCreateGame;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    return message;
  },

  toJSON(message: MsgCreateGame): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgCreateGame>): MsgCreateGame {
    const message = { ...baseMsgCreateGame } as MsgCreateGame;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    return message;
  },
};

const baseMsgCreateGameResponse: object = {};

export const MsgCreateGameResponse = {
  encode(
    message: MsgCreateGameResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.game !== undefined) {
      Game.encode(message.game, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgCreateGameResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgCreateGameResponse } as MsgCreateGameResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.game = Game.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateGameResponse {
    const message = { ...baseMsgCreateGameResponse } as MsgCreateGameResponse;
    if (object.game !== undefined && object.game !== null) {
      message.game = Game.fromJSON(object.game);
    } else {
      message.game = undefined;
    }
    return message;
  },

  toJSON(message: MsgCreateGameResponse): unknown {
    const obj: any = {};
    message.game !== undefined &&
      (obj.game = message.game ? Game.toJSON(message.game) : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgCreateGameResponse>
  ): MsgCreateGameResponse {
    const message = { ...baseMsgCreateGameResponse } as MsgCreateGameResponse;
    if (object.game !== undefined && object.game !== null) {
      message.game = Game.fromPartial(object.game);
    } else {
      message.game = undefined;
    }
    return message;
  },
};

const baseMsgStartGame: object = { creator: "", id: "" };

export const MsgStartGame = {
  encode(message: MsgStartGame, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgStartGame {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgStartGame } as MsgStartGame;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgStartGame {
    const message = { ...baseMsgStartGame } as MsgStartGame;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = "";
    }
    return message;
  },

  toJSON(message: MsgStartGame): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgStartGame>): MsgStartGame {
    const message = { ...baseMsgStartGame } as MsgStartGame;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = "";
    }
    return message;
  },
};

const baseMsgStartGameResponse: object = {};

export const MsgStartGameResponse = {
  encode(
    message: MsgStartGameResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.game !== undefined) {
      Game.encode(message.game, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgStartGameResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgStartGameResponse } as MsgStartGameResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.game = Game.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgStartGameResponse {
    const message = { ...baseMsgStartGameResponse } as MsgStartGameResponse;
    if (object.game !== undefined && object.game !== null) {
      message.game = Game.fromJSON(object.game);
    } else {
      message.game = undefined;
    }
    return message;
  },

  toJSON(message: MsgStartGameResponse): unknown {
    const obj: any = {};
    message.game !== undefined &&
      (obj.game = message.game ? Game.toJSON(message.game) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgStartGameResponse>): MsgStartGameResponse {
    const message = { ...baseMsgStartGameResponse } as MsgStartGameResponse;
    if (object.game !== undefined && object.game !== null) {
      message.game = Game.fromPartial(object.game);
    } else {
      message.game = undefined;
    }
    return message;
  },
};

const baseMsgMakeMove: object = { creator: "", id: "", row: "", col: "" };

export const MsgMakeMove = {
  encode(message: MsgMakeMove, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    if (message.row !== "") {
      writer.uint32(26).string(message.row);
    }
    if (message.col !== "") {
      writer.uint32(34).string(message.col);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgMakeMove {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgMakeMove } as MsgMakeMove;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = reader.string();
          break;
        case 3:
          message.row = reader.string();
          break;
        case 4:
          message.col = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgMakeMove {
    const message = { ...baseMsgMakeMove } as MsgMakeMove;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = "";
    }
    if (object.row !== undefined && object.row !== null) {
      message.row = String(object.row);
    } else {
      message.row = "";
    }
    if (object.col !== undefined && object.col !== null) {
      message.col = String(object.col);
    } else {
      message.col = "";
    }
    return message;
  },

  toJSON(message: MsgMakeMove): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    message.row !== undefined && (obj.row = message.row);
    message.col !== undefined && (obj.col = message.col);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgMakeMove>): MsgMakeMove {
    const message = { ...baseMsgMakeMove } as MsgMakeMove;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = "";
    }
    if (object.row !== undefined && object.row !== null) {
      message.row = object.row;
    } else {
      message.row = "";
    }
    if (object.col !== undefined && object.col !== null) {
      message.col = object.col;
    } else {
      message.col = "";
    }
    return message;
  },
};

const baseMsgMakeMoveResponse: object = {};

export const MsgMakeMoveResponse = {
  encode(
    message: MsgMakeMoveResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.game !== undefined) {
      Game.encode(message.game, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgMakeMoveResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgMakeMoveResponse } as MsgMakeMoveResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.game = Game.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgMakeMoveResponse {
    const message = { ...baseMsgMakeMoveResponse } as MsgMakeMoveResponse;
    if (object.game !== undefined && object.game !== null) {
      message.game = Game.fromJSON(object.game);
    } else {
      message.game = undefined;
    }
    return message;
  },

  toJSON(message: MsgMakeMoveResponse): unknown {
    const obj: any = {};
    message.game !== undefined &&
      (obj.game = message.game ? Game.toJSON(message.game) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgMakeMoveResponse>): MsgMakeMoveResponse {
    const message = { ...baseMsgMakeMoveResponse } as MsgMakeMoveResponse;
    if (object.game !== undefined && object.game !== null) {
      message.game = Game.fromPartial(object.game);
    } else {
      message.game = undefined;
    }
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  CreateGame(request: MsgCreateGame): Promise<MsgCreateGameResponse>;
  StartGame(request: MsgStartGame): Promise<MsgStartGameResponse>;
  /** this line is used by starport scaffolding # proto/tx/rpc */
  MakeMove(request: MsgMakeMove): Promise<MsgMakeMoveResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  CreateGame(request: MsgCreateGame): Promise<MsgCreateGameResponse> {
    const data = MsgCreateGame.encode(request).finish();
    const promise = this.rpc.request(
      "paymog.tictactoe.tictactoe.Msg",
      "CreateGame",
      data
    );
    return promise.then((data) =>
      MsgCreateGameResponse.decode(new Reader(data))
    );
  }

  StartGame(request: MsgStartGame): Promise<MsgStartGameResponse> {
    const data = MsgStartGame.encode(request).finish();
    const promise = this.rpc.request(
      "paymog.tictactoe.tictactoe.Msg",
      "StartGame",
      data
    );
    return promise.then((data) =>
      MsgStartGameResponse.decode(new Reader(data))
    );
  }

  MakeMove(request: MsgMakeMove): Promise<MsgMakeMoveResponse> {
    const data = MsgMakeMove.encode(request).finish();
    const promise = this.rpc.request(
      "paymog.tictactoe.tictactoe.Msg",
      "MakeMove",
      data
    );
    return promise.then((data) => MsgMakeMoveResponse.decode(new Reader(data)));
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array>;
}

type Builtin = Date | Function | Uint8Array | string | number | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;
