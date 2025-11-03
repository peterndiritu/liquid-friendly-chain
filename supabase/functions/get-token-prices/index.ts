import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface TokenPriceData {
  price: number;
  change24h: number;
}

const COINCAP_IDS: Record<string, string> = {
  ETH: "ethereum",
  BNB: "binance-coin",
  MATIC: "polygon",
  POL: "polygon",
  AVAX: "avalanche",
  OP: "optimism",
  ARB: "arbitrum",
  FTM: "fantom",
  CRO: "crypto-com-coin",
  CELO: "celo",
  GLMR: "moonbeam",
  XDAI: "xdai",
  MNT: "mantle",
  USDT: "tether",
  USDC: "usd-coin",
  FLD: "fluid",
  ETH_AURORA: "ethereum",
};

// In-memory cache
let priceCache: { data: any; timestamp: number } | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { symbols } = await req.json();

    if (!symbols || !Array.isArray(symbols)) {
      console.error('Invalid request: symbols must be an array');
      return new Response(
        JSON.stringify({ error: 'Invalid symbols array' }), 
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Received request for symbols: ${symbols.join(', ')}`);

    // Check cache
    if (priceCache && Date.now() - priceCache.timestamp < CACHE_DURATION) {
      console.log('Returning cached prices');
      return new Response(
        JSON.stringify(priceCache.data),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Build CoinCap API query
    const ids = symbols
      .map((symbol: string) => COINCAP_IDS[symbol])
      .filter(Boolean)
      .join(',');

    if (!ids) {
      console.error('No valid symbols found in request');
      return new Response(
        JSON.stringify({ error: 'No valid symbols provided' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Fetching prices from CoinCap for: ${ids}`);

    // Fetch from CoinCap
    const response = await fetch(
      `https://api.coincap.io/v2/assets?ids=${ids}`,
      { headers: { 'Accept': 'application/json' } }
    );

    if (!response.ok) {
      console.error(`CoinCap API error: ${response.status}`);
      throw new Error(`CoinCap API error: ${response.status}`);
    }

    const { data } = await response.json();
    console.log(`Successfully fetched ${data.length} token prices`);

    // Map response to symbol-based object
    const priceMap: Record<string, TokenPriceData> = {};
    symbols.forEach((symbol: string) => {
      const id = COINCAP_IDS[symbol];
      const asset = data.find((a: any) => a.id === id);

      if (asset) {
        priceMap[symbol] = {
          price: parseFloat(asset.priceUsd),
          change24h: parseFloat(asset.changePercent24Hr) || 0,
        };
      }
    });

    // Cache the result
    priceCache = {
      data: priceMap,
      timestamp: Date.now(),
    };

    console.log('Returning fresh prices from CoinCap');
    return new Response(
      JSON.stringify(priceMap),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in get-token-prices function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
