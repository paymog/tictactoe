package keeper

import (
	"context"
	"github.com/google/uuid"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/paymog/tictactoe/x/tictactoe/types"
)

func (k msgServer) CreateGame(goCtx context.Context, msg *types.MsgCreateGame) (*types.MsgCreateGameResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Handling the message
	_ = ctx
	id, err := uuid.NewUUID()
	if err != nil {
		return nil, err
	}

	game := types.Game{
		Creator: msg.Creator,
		Id:      id.String(),
		Status:  types.GameStatus_OPEN,
		State:   make([]types.Cell, 9),
	}

	k.saveGame(ctx, &game)

	return &types.MsgCreateGameResponse{Game: &game}, nil
}
