import {
  useCallback,
  useId,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { fetchSubThunk } from "../features/subredditPost/subredditPostSlice";
import { useSubredditSuggestions } from "../hooks/useSubredditSuggestions";

export default function SubredditSearch() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [showHint, setShowHint] = useState(true);
  const listId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { suggestions, loading, error } = useSubredditSuggestions(query);

  const goToSubreddit = useCallback(
    (name: string) => {
      const normalized = name.replace(/^r\//i, "").trim();
      if (!normalized) return;
      setShowHint(false);
      setOpen(false);
      setQuery("");
      setHighlightIndex(-1);
      dispatch(fetchSubThunk(normalized));
      navigate(`/subreddit/${normalized}`);
    },
    [dispatch, navigate],
  );

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = query.replace(/\s+/g, "");
    if (!value) return;
    if (highlightIndex >= 0 && suggestions[highlightIndex]) {
      goToSubreddit(suggestions[highlightIndex].name);
      return;
    }
    goToSubreddit(value);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (!open && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      setOpen(true);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((i) =>
        i < suggestions.length - 1 ? i + 1 : 0,
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((i) =>
        i > 0 ? i - 1 : suggestions.length - 1,
      );
    } else if (e.key === "Enter" && highlightIndex >= 0) {
      e.preventDefault();
      goToSubreddit(suggestions[highlightIndex].name);
    } else if (e.key === "Escape") {
      setOpen(false);
      setHighlightIndex(-1);
    }
  }

  const showList =
    open && query.trim().length >= 2 && (loading || suggestions.length > 0 || error);

  return (
    <div className="subreddit-search">
      <form onSubmit={handleSubmit} className="search-form" role="search">
        <input
          ref={inputRef}
          name="sub"
          type="search"
          autoComplete="off"
          aria-autocomplete="list"
          aria-controls={listId}
          aria-expanded={Boolean(showList)}
          placeholder="Search subreddits…"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setHighlightIndex(-1);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => {
            window.setTimeout(() => setOpen(false), 150);
          }}
          onKeyDown={handleKeyDown}
        />
        <button type="submit" disabled={!query.trim()}>
          Go
        </button>
        {showHint && <span className="search-hint">⬅ find your sub</span>}
      </form>

      {showList && (
        <ul id={listId} className="search-suggestions" role="listbox">
          {loading && (
            <li className="search-suggestion search-suggestion--meta">
              Searching…
            </li>
          )}
          {error && (
            <li className="search-suggestion search-suggestion--meta">
              {error}
            </li>
          )}
          {!loading &&
            !error &&
            suggestions.map((sub, i) => (
              <li
                key={sub.name}
                role="option"
                aria-selected={i === highlightIndex}
                className={
                  i === highlightIndex
                    ? "search-suggestion search-suggestion--active"
                    : "search-suggestion"
                }
                onMouseDown={(e) => e.preventDefault()}
                onMouseEnter={() => setHighlightIndex(i)}
                onClick={() => goToSubreddit(sub.name)}
              >
                <span className="search-suggestion-name">{sub.displayName}</span>
                <span className="search-suggestion-meta">
                  {sub.subscribers.toLocaleString()} members
                </span>
                {sub.publicDescription && (
                  <span className="search-suggestion-desc">
                    {sub.publicDescription}
                  </span>
                )}
              </li>
            ))}
          {!loading && !error && suggestions.length === 0 && (
            <li className="search-suggestion search-suggestion--meta">
              No subreddits found
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
