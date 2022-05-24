package keeper

import (
	"context"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/paymog/tictactoe/x/tictactoe/types"
)

func (k msgServer) StartGame(goCtx context.Context, msg *types.MsgStartGame) (*types.MsgStartGameResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Handling the message
	store := k.getGameStore(ctx)

	value := store.Get([]byte(msg.GetId()))
	var game types.Game
	if err := k.cdc.Unmarshal(value, &game); err != nil {
		return nil, err
	}

	if game.Opponent != "" {
		return nil, fmt.Errorf("game is already started")
	}

	if game.Creator == msg.GetCreator() {
		return nil, fmt.Errorf("cannot start own game")
	}

	// save the opponent
	game.Opponent = msg.Creator
	store.Set([]byte(game.Id), k.cdc.MustMarshal(&game))

	return &types.MsgStartGameResponse{Game: &game}, nil
}
