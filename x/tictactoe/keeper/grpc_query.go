package keeper

import (
	"github.com/paymog/tictactoe/x/tictactoe/types"
)

var _ types.QueryServer = Keeper{}
