/* eslint-disable */
import { Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "paymog.tictactoe.tictactoe";

export interface Game {
  creator: string;
  opponent: string;
  open: boolean;
  id: string;
}

const baseGame: object = { creator: "", opponent: "", open: false, id: "" };

export const Game = {
  encode(message: Game, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.opponent !== "") {
      writer.uint32(18).string(message.opponent);
    }
    if (message.open === true) {
      writer.uint32(24).bool(message.open);
    }
    if (message.id !== "") {
      writer.uint32(34).string(message.id);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Game {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGame } as Game;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.opponent = reader.string();
          break;
        case 3:
          message.open = reader.bool();
          break;
        case 4:
          message.id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Game {
    const message = { ...baseGame } as Game;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.opponent !== undefined && object.opponent !== null) {
      message.opponent = String(object.opponent);
    } else {
      message.opponent = "";
    }
    if (object.open !== undefined && object.open !== null) {
      message.open = Boolean(object.open);
    } else {
      message.open = false;
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = "";
    }
    return message;
  },

  toJSON(message: Game): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.opponent !== undefined && (obj.opponent = message.opponent);
    message.open !== undefined && (obj.open = message.open);
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial(object: DeepPartial<Game>): Game {
    const message = { ...baseGame } as Game;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.opponent !== undefined && object.opponent !== null) {
      message.opponent = object.opponent;
    } else {
      message.opponent = "";
    }
    if (object.open !== undefined && object.open !== null) {
      message.open = object.open;
    } else {
      message.open = false;
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = "";
    }
    return message;
  },
};

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
