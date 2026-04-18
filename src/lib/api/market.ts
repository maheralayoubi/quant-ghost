export type MarketData = {
  id: string;
  symbol: string;
  priceUsd: number;
  change24h: number;
  volume24h: number;
};

// We track the top 5 assets to gauge broad market condition
const TRACKED_ASSETS = ["bitcoin", "ethereum", "solana", "binancecoin", "arbitrum"];

export async function getMarketData(): Promise<MarketData[]> {
  try {
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${TRACKED_ASSETS.join(
      ","
    )}&vs_currencies=usd&include_24hr_vol=true&include_24hr_change=true`;

    const res = await fetch(url, {
      next: { revalidate: 3600 }, // Cache on Next.js side for 1 hour
    });

    if (!res.ok) {
      throw new Error(`CoinGecko API failed: ${res.status}`);
    }

    const data = await res.json();

    const results: MarketData[] = TRACKED_ASSETS.map((id) => {
      const assetInfo = data[id];
      return {
        id,
        symbol: id === "binancecoin" ? "bnb" : id.substring(0, 4).toUpperCase(),
        priceUsd: assetInfo?.usd || 0,
        change24h: assetInfo?.usd_24h_change || 0,
        volume24h: assetInfo?.usd_24h_vol || 0,
      };
    });

    return results.map((r) => {
      if (r.id === "bitcoin") r.symbol = "BTC";
      if (r.id === "ethereum") r.symbol = "ETH";
      if (r.id === "solana") r.symbol = "SOL";
      if (r.id === "arbitrum") r.symbol = "ARB";
      return r;
    });
  } catch (error) {
    console.error("Failed to fetch market data", error);
    return [];
  }
}
