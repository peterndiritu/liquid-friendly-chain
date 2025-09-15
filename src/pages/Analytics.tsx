import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  TrendingUp, 
  Activity, 
  Users, 
  DollarSign, 
  Zap,
  Eye,
  Target,
  Globe,
  Clock
} from "lucide-react";

const Analytics = () => {
  const liveMetrics = [
    { label: "Network TPS", value: "847,329", change: "+12.5%", icon: Zap },
    { label: "Active Addresses", value: "2.1M", change: "+8.3%", icon: Users },
    { label: "TVL", value: "$1.2B", change: "+15.7%", icon: DollarSign },
    { label: "Network Uptime", value: "99.97%", change: "+0.01%", icon: Activity }
  ];

  const analyticsFeatures = [
    {
      icon: BarChart3,
      title: "Real-Time Dashboard",
      description: "Monitor network performance, transaction volumes, and user activity with live updates every second.",
      features: ["Live data feeds", "Custom alerts", "Historical charts"]
    },
    {
      icon: TrendingUp,
      title: "Predictive Analytics",
      description: "AI-powered insights and forecasting to predict network trends and optimize performance.",
      features: ["ML predictions", "Trend analysis", "Performance optimization"]
    },
    {
      icon: Eye,
      title: "Transaction Explorer",
      description: "Deep dive into individual transactions with detailed analysis and visual representations.",
      features: ["Transaction tracing", "Gas analytics", "Smart contract insights"]
    },
    {
      icon: Target,
      title: "Performance Metrics",
      description: "Comprehensive performance monitoring with detailed metrics and benchmark comparisons.",
      features: ["Benchmarking", "SLA monitoring", "Performance alerts"]
    },
    {
      icon: Globe,
      title: "Network Visualization",
      description: "Interactive network maps showing node distribution, connectivity, and geographic data.",
      features: ["Node mapping", "Connectivity analysis", "Geographic insights"]
    },
    {
      icon: Clock,
      title: "Historical Data",
      description: "Access complete historical data with advanced querying and export capabilities.",
      features: ["Data exports", "Custom queries", "Archive access"]
    }
  ];

  const chartData = [
    { name: "Jan", transactions: 4000000, volume: 2400000 },
    { name: "Feb", transactions: 5200000, volume: 1398000 },
    { name: "Mar", transactions: 7800000, volume: 9800000 },
    { name: "Apr", transactions: 9100000, volume: 3908000 },
    { name: "May", transactions: 12300000, volume: 4800000 },
    { name: "Jun", transactions: 15600000, volume: 3800000 }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">Analytics</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-8">
              Comprehensive blockchain analytics with real-time monitoring, predictive insights, and advanced data visualization
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="button-glow animate-glow-pulse">
                Launch Dashboard
              </Button>
              <Button size="lg" variant="outline" className="border-primary/50 text-primary hover:bg-primary/10">
                API Documentation
              </Button>
            </div>
          </div>
        </section>

        {/* Live Metrics */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 gradient-text">Live Network Metrics</h2>
              <p className="text-xl text-muted-foreground">
                Real-time network performance and usage statistics
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {liveMetrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <Card key={index} className="card-glow p-6 animate-fade-in">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <span className="text-sm text-muted-foreground">{metric.label}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-3xl font-bold">{metric.value}</div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-green-500 font-medium">{metric.change}</span>
                        <span className="text-sm text-muted-foreground">24h</span>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Analytics Features */}
        <section className="py-20 px-6 bg-muted/20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 gradient-text">Analytics Platform</h2>
              <p className="text-xl text-muted-foreground">
                Advanced tools for blockchain data analysis and network monitoring
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {analyticsFeatures.map((feature, index) => (
                <Card key={index} className="card-glow p-6 animate-fade-in hover:scale-105 transition-transform">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/60 mb-4">
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground mb-4">{feature.description}</p>
                  </div>
                  <ul className="space-y-2">
                    {feature.features.map((item, i) => (
                      <li key={i} className="flex items-center text-sm">
                        <div className="w-2 h-2 rounded-full bg-primary mr-3"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Charts Section */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 gradient-text">Network Growth</h2>
              <p className="text-xl text-muted-foreground">
                Historical performance data and growth trends
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Transaction Volume Chart */}
              <Card className="card-glow p-6">
                <h3 className="text-xl font-bold mb-6 text-center">Monthly Transactions</h3>
                <div className="h-64 flex items-end justify-between gap-2 px-4">
                  {chartData.map((data, index) => (
                    <div key={index} className="flex flex-col items-center gap-2">
                      <div 
                        className="bg-gradient-to-t from-primary to-primary/60 rounded-t-sm transition-all duration-500 hover:scale-110"
                        style={{ 
                          height: `${(data.transactions / 20000000) * 200}px`,
                          width: '40px'
                        }}
                      ></div>
                      <span className="text-xs text-muted-foreground">{data.name}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Volume Chart */}
              <Card className="card-glow p-6">
                <h3 className="text-xl font-bold mb-6 text-center">Trading Volume</h3>
                <div className="h-64 flex items-end justify-between gap-2 px-4">
                  {chartData.map((data, index) => (
                    <div key={index} className="flex flex-col items-center gap-2">
                      <div 
                        className="bg-gradient-to-t from-green-500 to-green-400 rounded-t-sm transition-all duration-500 hover:scale-110"
                        style={{ 
                          height: `${(data.volume / 10000000) * 200}px`,
                          width: '40px'
                        }}
                      ></div>
                      <span className="text-xs text-muted-foreground">{data.name}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* API Access */}
        <section className="py-20 px-6 bg-muted/20">
          <div className="max-w-6xl mx-auto">
            <Card className="card-glow p-12 text-center">
              <h2 className="text-4xl font-bold mb-4 gradient-text">Developer API</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Access comprehensive blockchain data through our high-performance API with real-time WebSocket feeds and historical data endpoints
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div className="space-y-2">
                  <div className="text-3xl font-bold gradient-text">99.9%</div>
                  <p className="text-muted-foreground">API Uptime</p>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold gradient-text">&lt;50ms</div>
                  <p className="text-muted-foreground">Response Time</p>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold gradient-text">1M+</div>
                  <p className="text-muted-foreground">Requests/Day</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="button-glow">
                  Get API Key
                </Button>
                <Button size="lg" variant="outline" className="border-primary/50 text-primary hover:bg-primary/10">
                  View Documentation
                </Button>
              </div>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Analytics;