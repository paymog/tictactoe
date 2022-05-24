package keeper

import (
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/paymog/tictactoe/x/tictactoe/types"
)

func (k Keeper) AppendGame(ctx sdk.Context, game types.Game) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte(types.GamesKey))
	// Convert the post ID into bytes
	//byteKey := make([]byte, 8)
	//binary.BigEndian.PutUint64(byteKey, game.Id)
	// Marshal the post into bytes
	appendedValue := k.cdc.MustMarshal(&game)
	// Insert the post bytes using post ID as a key
	store.Set([]byte(game.Id), appendedValue)

}
