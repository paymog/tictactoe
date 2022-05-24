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
	game, err := k.getGame(ctx, msg.GetId())
	if err != nil {
		return nil, fmt.Errorf("could not get game: %v", err)
	}

	if game.Opponent != "" {
		return nil, fmt.Errorf("game is already started")
	}

	if game.Creator == msg.GetCreator() {
		return nil, fmt.Errorf("cannot start own game")
	}

	game.Opponent = msg.Creator
	game.Status = types.GameStatus_STARTED
	k.saveGame(ctx, game)

	return &types.MsgStartGameResponse{Game: game}, nil
}
