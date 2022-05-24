package cli

import (
	"strconv"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/paymog/tictactoe/x/tictactoe/types"
	"github.com/spf13/cobra"
)

var _ = strconv.Itoa(0)

func CmdMakeMove() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "make-move [id] [row] [col]",
		Short: "Broadcast message makeMove",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			argId := args[0]
			argRow := args[1]
			argCol := args[2]

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgMakeMove(
				clientCtx.GetFromAddress().String(),
				argId,
				argRow,
				argCol,
			)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}
