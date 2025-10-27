import TokenIcon from "./TokenIcon";

interface TokenBalanceRowProps {
  symbol: string;
  balance: string;
  type: 'native' | 'ERC20';
}

const TokenBalanceRow = ({ symbol, balance, type }: TokenBalanceRowProps) => {
  const balanceNum = parseFloat(balance);
  const hasBalance = balanceNum > 0;

  return (
    <div className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
      hasBalance ? 'bg-primary/5 hover:bg-primary/10' : 'bg-muted/30 opacity-60'
    }`}>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-background border flex items-center justify-center">
          <TokenIcon symbol={symbol} />
        </div>
        <div>
          <p className="font-semibold">{symbol}</p>
          <p className="text-xs text-muted-foreground">
            {type === 'native' ? 'Native Token' : 'ERC20 Token'}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-bold">{balanceNum.toFixed(4)}</p>
      </div>
    </div>
  );
};

export default TokenBalanceRow;
