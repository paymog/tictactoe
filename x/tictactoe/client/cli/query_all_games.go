package cli

import (
	"strconv"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/paymog/tictactoe/x/tictactoe/types"
	"github.com/spf13/cobra"
)

var _ = strconv.Itoa(0)

func CmdAllGames() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "all-games",
		Short: "Query allGames",
		Args:  cobra.ExactArgs(0),
		RunE: func(cmd *cobra.Command, args []string) (err error) {

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			queryClient := types.NewQueryClient(clientCtx)

			params := &types.QueryAllGamesRequest{}

			res, err := queryClient.AllGames(cmd.Context(), params)
			if err != nil {
				return err
			}

			return clientCtx.PrintProto(res)
		},
	}

	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}
