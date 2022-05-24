package keeper

import (
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/paymog/tictactoe/x/tictactoe/types"
)

func (k Keeper) getGameStore(ctx sdk.Context) prefix.Store {
	return prefix.NewStore(ctx.KVStore(k.storeKey), []byte(types.GamesKey))
}

func (k Keeper) saveGame(ctx sdk.Context, game *types.Game) {
	store := k.getGameStore(ctx)
	appendedValue := k.cdc.MustMarshal(game)
	store.Set([]byte(game.Id), appendedValue)
}

func (k Keeper) getGame(ctx sdk.Context, id string) (*types.Game, error) {
	store := k.getGameStore(ctx)

	value := store.Get([]byte(id))
	var game types.Game
	if err := k.cdc.Unmarshal(value, &game); err != nil {
		return nil, err
	}

	return &game, nil
}
