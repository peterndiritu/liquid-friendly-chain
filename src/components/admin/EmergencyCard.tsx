import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useFluidContract } from "@/hooks/useFluidContract";
import { useAdminActions } from "@/hooks/useAdminActions";
import { AlertTriangle, ShieldCheck, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const EmergencyCard = () => {
  const { emergencyStop, refetchAll } = useFluidContract();
  const { setEmergency, actionLoading } = useAdminActions();

  const isActive = emergencyStop === true;
  const isLoading = actionLoading === "Activate Emergency" || actionLoading === "Deactivate Emergency";

  const handleToggle = async (activate: boolean) => {
    try {
      await setEmergency(activate);
      setTimeout(refetchAll, 2000);
    } catch (error) {
      // Error handled in hook
    }
  };

  return (
    <Card className={cn(
      "border-border transition-colors",
      isActive && "border-destructive/50 bg-destructive/5"
    )}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <AlertTriangle className={cn(
            "w-5 h-5",
            isActive ? "text-destructive" : "text-amber-500"
          )} />
          Emergency Stop
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className={cn(
          "rounded-lg p-4 flex items-center gap-3",
          isActive ? "bg-destructive/10" : "bg-green-500/10"
        )}>
          {isActive ? (
            <AlertTriangle className="w-6 h-6 text-destructive" />
          ) : (
            <ShieldCheck className="w-6 h-6 text-green-500" />
          )}
          <div>
            <div className={cn(
              "font-semibold",
              isActive ? "text-destructive" : "text-green-500"
            )}>
              {isActive ? "EMERGENCY ACTIVE" : "SYSTEM NORMAL"}
            </div>
            <div className="text-xs text-muted-foreground">
              {isActive 
                ? "All presale purchases are halted" 
                : "Presale is accepting purchases"
              }
            </div>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="destructive"
            onClick={() => handleToggle(true)}
            disabled={isLoading || isActive}
            className="flex-1"
          >
            {isLoading && actionLoading === "Activate Emergency" ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Activate"
            )}
          </Button>
          <Button
            variant="outline"
            onClick={() => handleToggle(false)}
            disabled={isLoading || !isActive}
            className="flex-1"
          >
            {isLoading && actionLoading === "Deactivate Emergency" ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Deactivate"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
