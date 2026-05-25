import { useEffect, useRef, useState } from "react";
import {
  searchSubreddits,
  type SubredditSuggestion,
} from "../api/subredditSearchAPI";
import { useDebouncedValue } from "./useDebouncedValue";

const CACHE_TTL_MS = 5 * 60 * 1000;
const MIN_QUERY_LENGTH = 2;

type CacheEntry = {
  data: SubredditSuggestion[];
  fetchedAt: number;
};

const suggestionCache = new Map<string, CacheEntry>();

function getCached(query: string): SubredditSuggestion[] | null {
  const key = query.toLowerCase();
  const entry = suggestionCache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.fetchedAt > CACHE_TTL_MS) {
    suggestionCache.delete(key);
    return null;
  }
  return entry.data;
}

function setCache(query: string, data: SubredditSuggestion[]) {
  suggestionCache.set(query.toLowerCase(), { data, fetchedAt: Date.now() });
}

export function useSubredditSuggestions(query: string) {
  const debouncedQuery = useDebouncedValue(query.trim(), 350);
  const [suggestions, setSuggestions] = useState<SubredditSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    abortRef.current?.abort();

    if (debouncedQuery.length < MIN_QUERY_LENGTH) {
      setSuggestions([]);
      setLoading(false);
      setError(null);
      return;
    }

    const cached = getCached(debouncedQuery);
    if (cached) {
      setSuggestions(cached);
      setLoading(false);
      setError(null);
      return;
    }

    const controller = new AbortController();
    abortRef.current = controller;
    setLoading(true);
    setError(null);

    searchSubreddits(debouncedQuery, controller.signal)
      .then((data) => {
        if (controller.signal.aborted) return;
        setCache(debouncedQuery, data);
        setSuggestions(data);
      })
      .catch((err: Error) => {
        if (controller.signal.aborted) return;
        setSuggestions([]);
        setError(err.message || "Search failed");
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [debouncedQuery]);

  return { suggestions, loading, error, debouncedQuery };
}
