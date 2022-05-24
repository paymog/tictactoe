package keeper

import (
	"context"
	"fmt"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/paymog/tictactoe/x/tictactoe/types"
	"github.com/tendermint/tendermint/crypto"
	"strconv"
)

type PlayerSymbol string

const (
	X PlayerSymbol = "X"
	O              = "O"
)

func numMovesSoFar(game *types.Game) int {

	numberOfMovesSoFar := 0
	for _, cell := range game.State {
		if cell != types.Cell_EMPTY {
			numberOfMovesSoFar += 1
		}
	}
	return numberOfMovesSoFar
}

func nextPlayer(game *types.Game) PlayerSymbol {

	if numMovesSoFar(game)%2 == 0 {
		return X
	} else {
		return O
	}
}

func checkForWin(game *types.Game) bool {
	for row := 0; row < 3; row++ {
		if game.State[row*3] != types.Cell_EMPTY && game.State[row*3] == game.State[row*3+1] && game.State[row*3] == game.State[row*3+2] {
			return true
		}
	}
	for col := 0; col < 3; col++ {
		if game.State[col] != types.Cell_EMPTY && game.State[col] == game.State[3+col] && game.State[col] == game.State[6+col] {
			return true
		}
	}

	// main diagonal win
	if game.State[0] != types.Cell_EMPTY && game.State[0] == game.State[4] && game.State[0] == game.State[8] {
		return true
	}

	// antidiagonal win
	if game.State[2] != types.Cell_EMPTY && game.State[2] == game.State[4] && game.State[2] == game.State[6] {
		return true
	}

	return false
}

func getPlayerSymbol(player string, game *types.Game) PlayerSymbol {
	hash := crypto.Sha256([]byte(game.Creator + game.Opponent))
	leadingBit := hash[0] >> 7
	var playerSymbol PlayerSymbol

	if leadingBit == byte(0) {
		if player == game.Opponent {
			playerSymbol = X
		} else {
			playerSymbol = O
		}
	} else {
		if player == game.Opponent {
			playerSymbol = O
		} else {
			playerSymbol = X
		}
	}

	return playerSymbol
}

func isIndexAvailable(game *types.Game, row, col int) (bool, error) {
	if row < 0 || row >= 3 || col < 0 || col >= 3 {
		return false, fmt.Errorf("invalid row or col")
	}
	index := row*3 + col

	return game.State[index] == types.Cell_EMPTY, nil
}

func (k msgServer) MakeMove(goCtx context.Context, msg *types.MsgMakeMove) (*types.MsgMakeMoveResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Handling the message
	_ = ctx

	game, err := k.getGame(ctx, msg.GetId())
	if err != nil {
		return nil, fmt.Errorf("could not get game: %v", err)
	}

	if game.Status != types.GameStatus_STARTED {
		return nil, fmt.Errorf("game has not been started")
	}

	if msg.Creator != game.Creator || msg.Creator != game.Opponent {
		return nil, fmt.Errorf("you are not playing this game")
	}

	nextPlayer := nextPlayer(game)
	playerSymbol := getPlayerSymbol(msg.Creator, game)

	if nextPlayer != playerSymbol {
		return nil, fmt.Errorf("it's not your turn")
	}

	row, err := strconv.Atoi(msg.Row)
	if err != nil {
		return nil, err
	}
	col, err := strconv.Atoi(msg.Col)
	if err != nil {
		return nil, err
	}

	available, err := isIndexAvailable(game, row, col)
	if err != nil {
		return nil, err
	}
	if !available {
		return nil, fmt.Errorf("that spot is already taken")
	}

	var stateToAdd types.Cell
	if playerSymbol == X {
		stateToAdd = types.Cell_X
	} else {
		stateToAdd = types.Cell_O
	}
	game.State[row*3+col] = stateToAdd

	if checkForWin(game) {
		if playerSymbol == X {
			game.Status = types.GameStatus_X_WINNER
		} else {
			game.Status = types.GameStatus_Y_WINNER
		}
	} else {
		if numMovesSoFar(game) == 9 {
			game.Status = types.GameStatus_TIE
		}
	}

	k.saveGame(ctx, game)

	return &types.MsgMakeMoveResponse{Game: game}, nil
}
