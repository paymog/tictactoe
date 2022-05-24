package keeper_test

import (
	"context"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	keepertest "github.com/paymog/tictactoe/testutil/keeper"
	"github.com/paymog/tictactoe/x/tictactoe/keeper"
	"github.com/paymog/tictactoe/x/tictactoe/types"
)

func setupMsgServer(t testing.TB) (types.MsgServer, context.Context) {
	k, ctx := keepertest.TictactoeKeeper(t)
	return keeper.NewMsgServerImpl(*k), sdk.WrapSDKContext(ctx)
}
