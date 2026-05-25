export interface SubredditSuggestion {
  name: string;
  displayName: string;
  subscribers: number;
  publicDescription: string;
}

export async function searchSubreddits(
  query: string,
  signal?: AbortSignal,
): Promise<SubredditSuggestion[]> {
  const q = query.trim();
  if (q.length < 2) return [];

  const url = `https://corsproxy.io/?https://www.reddit.com/subreddits/search.json?q=${encodeURIComponent(q)}&limit=8&include_over_18=on`;

  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error(`Subreddit search failed (${response.status})`);
  }

  const data = await response.json();
  const children = data?.data?.children ?? [];

  return children.map((child: { data: Record<string, unknown> }) => {
    const d = child.data;
    return {
      name: String(d.display_name ?? ""),
      displayName: String(d.display_name_prefixed ?? d.display_name ?? ""),
      subscribers: Number(d.subscribers ?? 0),
      publicDescription: String(d.public_description ?? "").slice(0, 120),
    };
  });
}
