import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFluidContract } from "@/hooks/useFluidContract";
import { useAdminActions } from "@/hooks/useAdminActions";
import { truncateAddress } from "@/lib/fluidContract";
import { Link2, Loader2, ExternalLink } from "lucide-react";

export const ChainlinkCard = () => {
  const { nativeUsdFeed, refetchAll } = useFluidContract();
  const { setFeed, actionLoading } = useAdminActions();
  
  const [newFeed, setNewFeed] = useState("");

  const isUpdating = actionLoading === "Set Price Feed";

  const handleSetFeed = async () => {
    if (!newFeed || !newFeed.startsWith("0x")) return;
    try {
      await setFeed(newFeed);
      setNewFeed("");
      setTimeout(refetchAll, 2000);
    } catch (error) {
      // Error handled in hook
    }
  };

  return (
    <Card className="border-border">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Link2 className="w-5 h-5 text-blue-500" />
          Chainlink Price Feed
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Feed */}
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-muted-foreground">Current MATIC/USD Feed</span>
            {nativeUsdFeed && (
              <a
                href={`https://polygonscan.com/address/${nativeUsdFeed}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary hover:underline flex items-center gap-1"
              >
                View <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
          <div className="font-mono text-sm text-foreground break-all">
            {nativeUsdFeed || "Not set"}
          </div>
        </div>

        {/* Update Feed */}
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Set New Price Feed</label>
          <div className="flex gap-2">
            <Input
              placeholder="Chainlink aggregator address (0x...)"
              value={newFeed}
              onChange={(e) => setNewFeed(e.target.value)}
              className="flex-1 font-mono text-xs"
            />
            <Button
              onClick={handleSetFeed}
              disabled={isUpdating || !newFeed}
            >
              {isUpdating ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Update"
              )}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Use official Chainlink aggregator addresses from{" "}
            <a 
              href="https://docs.chain.link/data-feeds/price-feeds/addresses?network=polygon"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Chainlink docs
            </a>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
