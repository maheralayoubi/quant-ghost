export type NewsArticle = {
  title: string;
  link: string;
  source: string;
  pubDate: string;
  description: string;
};

export async function getNewsData(): Promise<NewsArticle[]> {
  const apiKey = process.env.NEWSDATA_API_KEY;
  if (!apiKey) {
    console.warn("NEWSDATA_API_KEY missing. Using fallback mock data.");
    return getMockNews();
  }

  try {
    // Top 10 articles to save tokens
    const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&q=crypto OR bitcoin OR ethereum OR SEC&language=en&category=business,technology`;

    const res = await fetch(url, {
      next: { revalidate: 3600 }, 
    });

    if (!res.ok) {
      throw new Error(`NewsData API failed: ${res.status}`);
    }

    const data = await res.json();
    if (!data.results) return [];

    return data.results.slice(0, 10).map((article: any) => ({
      title: article.title,
      link: article.link,
      source: article.source_id,
      pubDate: article.pubDate,
      description: article.description || article.content || "",
    }));
  } catch (error) {
    console.error("Failed to fetch news data", error);
    return getMockNews();
  }
}

function getMockNews(): NewsArticle[] {
  return [
    {
      title: "Bitcoin ETFs See Third Day of Record Inflows",
      link: "#",
      source: "bloomberg",
      pubDate: new Date().toISOString(),
      description: "Spot Bitcoin and Ethereum ETFs reported over $800M in combined net inflows over the last 24 hours.",
    },
    {
      title: "SEC Delays Decision on New Solana Trust",
      link: "#",
      source: "reuters",
      pubDate: new Date(Date.now() - 3600000).toISOString(),
      description: "The SEC has pushed back its deadline to approve or deny the latest structural crypto trust product.",
    },
    {
      title: "Major US Bank Integrates On-Chain Settlements",
      link: "#",
      source: "wsj",
      pubDate: new Date(Date.now() - 7200000).toISOString(),
      description: "A top 5 US bank aims to streamline internal settlements using a private Ethereum subnet.",
    }
  ];
}
