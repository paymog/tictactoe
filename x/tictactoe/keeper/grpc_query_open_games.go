package keeper

import (
	"context"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	"github.com/paymog/tictactoe/x/tictactoe/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) OpenGames(goCtx context.Context, req *types.QueryOpenGamesRequest) (*types.QueryOpenGamesResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Process the query
	_ = ctx
	var games []*types.Game
	store := ctx.KVStore(k.storeKey)
	// Get the part of the store that keeps posts (using post key, which is "Post-value-")
	gamesStore := prefix.NewStore(store, []byte(types.GamesKey))

	pageRes, err := query.Paginate(gamesStore, req.Pagination, func(key []byte, value []byte) error {
		var game types.Game
		if err := k.cdc.Unmarshal(value, &game); err != nil {
			return err
		}
		if game.Status == types.GameStatus_OPEN {
			games = append(games, &game)
		}
		return nil
	})
	// Throw an error if pagination failed
	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}
	return &types.QueryOpenGamesResponse{Games: games, Pagination: pageRes}, nil
}
