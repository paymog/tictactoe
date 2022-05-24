/* eslint-disable */
import { Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "paymog.tictactoe.tictactoe";

export enum GameStatus {
  OPEN = 0,
  STARTED = 1,
  X_WINNER = 2,
  Y_WINNER = 3,
  TIE = 4,
  UNRECOGNIZED = -1,
}

export function gameStatusFromJSON(object: any): GameStatus {
  switch (object) {
    case 0:
    case "OPEN":
      return GameStatus.OPEN;
    case 1:
    case "STARTED":
      return GameStatus.STARTED;
    case 2:
    case "X_WINNER":
      return GameStatus.X_WINNER;
    case 3:
    case "Y_WINNER":
      return GameStatus.Y_WINNER;
    case 4:
    case "TIE":
      return GameStatus.TIE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return GameStatus.UNRECOGNIZED;
  }
}

export function gameStatusToJSON(object: GameStatus): string {
  switch (object) {
    case GameStatus.OPEN:
      return "OPEN";
    case GameStatus.STARTED:
      return "STARTED";
    case GameStatus.X_WINNER:
      return "X_WINNER";
    case GameStatus.Y_WINNER:
      return "Y_WINNER";
    case GameStatus.TIE:
      return "TIE";
    default:
      return "UNKNOWN";
  }
}

export enum Cell {
  EMPTY = 0,
  X = 1,
  O = 2,
  UNRECOGNIZED = -1,
}

export function cellFromJSON(object: any): Cell {
  switch (object) {
    case 0:
    case "EMPTY":
      return Cell.EMPTY;
    case 1:
    case "X":
      return Cell.X;
    case 2:
    case "O":
      return Cell.O;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Cell.UNRECOGNIZED;
  }
}

export function cellToJSON(object: Cell): string {
  switch (object) {
    case Cell.EMPTY:
      return "EMPTY";
    case Cell.X:
      return "X";
    case Cell.O:
      return "O";
    default:
      return "UNKNOWN";
  }
}

export interface Game {
  creator: string;
  opponent: string;
  id: string;
  state: Cell[];
  status: GameStatus;
}

const baseGame: object = {
  creator: "",
  opponent: "",
  id: "",
  state: 0,
  status: 0,
};

export const Game = {
  encode(message: Game, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.opponent !== "") {
      writer.uint32(18).string(message.opponent);
    }
    if (message.id !== "") {
      writer.uint32(26).string(message.id);
    }
    writer.uint32(34).fork();
    for (const v of message.state) {
      writer.int32(v);
    }
    writer.ldelim();
    if (message.status !== 0) {
      writer.uint32(40).int32(message.status);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Game {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGame } as Game;
    message.state = [];
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
          message.id = reader.string();
          break;
        case 4:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.state.push(reader.int32() as any);
            }
          } else {
            message.state.push(reader.int32() as any);
          }
          break;
        case 5:
          message.status = reader.int32() as any;
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
    message.state = [];
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
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = "";
    }
    if (object.state !== undefined && object.state !== null) {
      for (const e of object.state) {
        message.state.push(cellFromJSON(e));
      }
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = gameStatusFromJSON(object.status);
    } else {
      message.status = 0;
    }
    return message;
  },

  toJSON(message: Game): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.opponent !== undefined && (obj.opponent = message.opponent);
    message.id !== undefined && (obj.id = message.id);
    if (message.state) {
      obj.state = message.state.map((e) => cellToJSON(e));
    } else {
      obj.state = [];
    }
    message.status !== undefined &&
      (obj.status = gameStatusToJSON(message.status));
    return obj;
  },

  fromPartial(object: DeepPartial<Game>): Game {
    const message = { ...baseGame } as Game;
    message.state = [];
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
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = "";
    }
    if (object.state !== undefined && object.state !== null) {
      for (const e of object.state) {
        message.state.push(e);
      }
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    } else {
      message.status = 0;
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
