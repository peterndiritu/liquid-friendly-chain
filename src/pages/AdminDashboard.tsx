import { useActiveAccount } from "thirdweb/react";
import { AdminAccessGuard } from "@/components/admin/AdminAccessGuard";
import { ContractStatsCard } from "@/components/admin/ContractStatsCard";
import { PriceControlCard } from "@/components/admin/PriceControlCard";
import { EmergencyCard } from "@/components/admin/EmergencyCard";
import { PaymentTokensCard } from "@/components/admin/PaymentTokensCard";
import { LiquidityCard } from "@/components/admin/LiquidityCard";
import { IncentivesCard } from "@/components/admin/IncentivesCard";
import { VestingClaimsCard } from "@/components/admin/VestingClaimsCard";
import { OwnershipCard } from "@/components/admin/OwnershipCard";
import { ChainlinkCard } from "@/components/admin/ChainlinkCard";
import { useFluidContract } from "@/hooks/useFluidContract";
import { FLUID_CONTRACT_ADDRESS, truncateAddress } from "@/lib/fluidContract";
import { Shield, RefreshCw, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const AdminDashboardContent = () => {
  const account = useActiveAccount();
  const { refetchAll, isLoading } = useFluidContract();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
                <p className="text-sm text-muted-foreground">
                  FLUID Token Contract Management
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <div className="text-xs text-muted-foreground">Connected as</div>
                <div className="font-mono text-sm text-foreground">
                  {account ? truncateAddress(account.address) : "..."}
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={refetchAll}
                disabled={isLoading}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
              <a
                href={`https://polygonscan.com/address/${FLUID_CONTRACT_ADDRESS}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="sm">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Contract
                </Button>
              </a>
            </div>
          </div>

          {/* Contract Stats Overview */}
          <div className="mb-8">
            <ContractStatsCard />
          </div>

          {/* Admin Functions Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Row 1: Core Controls */}
            <PriceControlCard />
            <EmergencyCard />
            <ChainlinkCard />
            
            {/* Row 2: Token Management */}
            <PaymentTokensCard />
            <LiquidityCard />
            <IncentivesCard />
            
            {/* Row 3: Vesting & Ownership */}
            <div className="md:col-span-2">
              <VestingClaimsCard />
            </div>
            <OwnershipCard />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const AdminDashboard = () => {
  return (
    <AdminAccessGuard>
      <AdminDashboardContent />
    </AdminAccessGuard>
  );
};

export default AdminDashboard;
