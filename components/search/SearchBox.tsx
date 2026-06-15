"use client";

import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { siteSettings } from "@/lib/site-settings";

type PagefindResult = {
  id: string;
  data: () => Promise<{
    url: string;
    meta: { title?: string; image?: string };
    excerpt: string;
  }>;
};

type PagefindApi = {
  search: (query: string) => Promise<{ results: PagefindResult[] }>;
};

type SearchResult = {
  url: string;
  title: string;
  excerpt: string;
};

const SEARCH_INDEX_PENDING_MESSAGE = siteSettings.messages.searchIndexPending;
const PAGEFIND_ENABLED =
  siteSettings.featureFlags.searchEnabled &&
  process.env.NEXT_PUBLIC_PAGEFIND_ENABLED === "true";
const SEARCH_DISABLED_MESSAGE = siteSettings.messages.disabledSearch;

function toPlainTextExcerpt(excerpt: string) {
  return excerpt.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

declare global {
  interface Window {
    pagefind?: PagefindApi;
  }
}

export function SearchBox() {
  if (!PAGEFIND_ENABLED) {
    return <DisabledSearchBox />;
  }

  return <EnabledSearchBox />;
}

function DisabledSearchBox() {
  return (
    <div className="relative w-full max-w-full" aria-label="검색 상태">
      <label className="sr-only" htmlFor="site-search-disabled">
        검색 상태
      </label>
      <Search
        className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400"
        aria-hidden
      />
      <input
        id="site-search-disabled"
        type="search"
        value=""
        disabled
        aria-describedby="site-search-disabled-note"
        placeholder={SEARCH_DISABLED_MESSAGE}
        className="h-10 w-full rounded-md border border-slate-200 bg-slate-100 pl-9 pr-3 text-sm text-slate-500 outline-none placeholder:text-slate-500 disabled:cursor-not-allowed"
      />
      <p id="site-search-disabled-note" className="mt-1 text-xs leading-5 text-slate-500">
        {SEARCH_DISABLED_MESSAGE}
      </p>
    </div>
  );
}

function EnabledSearchBox() {
  const [query, setQuery] = useState("");
  const [ready, setReady] = useState(false);
  const [indexUnavailable, setIndexUnavailable] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    let active = true;
    let script: HTMLScriptElement | null = null;

    if (!PAGEFIND_ENABLED) {
      return () => {
        active = false;
      };
    }

    async function loadPagefind() {
      try {
        const response = await fetch("/pagefind/pagefind.js", {
          method: "HEAD",
          cache: "no-store",
        });

        if (!active) return;

        if (!response.ok) {
          setReady(false);
          setIndexUnavailable(true);
          return;
        }

        script = document.createElement("script");
        script.src = "/pagefind/pagefind.js";
        script.async = true;
        script.onload = () => {
          const loaded = Boolean(window.pagefind);
          setReady(loaded);
          setIndexUnavailable(!loaded);
        };
        script.onerror = () => {
          setReady(false);
          setIndexUnavailable(true);
        };
        document.body.appendChild(script);
      } catch {
        if (active) {
          setReady(false);
          setIndexUnavailable(true);
        }
      }
    }

    loadPagefind();

    return () => {
      active = false;
      script?.remove();
    };
  }, []);

  useEffect(() => {
    let active = true;
    async function runSearch() {
      const trimmedQuery = query.trim();
      if (!ready || !window.pagefind || trimmedQuery.length < 2) {
        setResults([]);
        return;
      }
      try {
        const response = await window.pagefind.search(trimmedQuery);
        const hydrated = await Promise.all(
          response.results.slice(0, 5).map(async (result) => {
            const data = await result.data();
            return {
              url: data.url,
              title: data.meta.title || "Biz2Lab 글",
              excerpt: toPlainTextExcerpt(data.excerpt),
            };
          }),
        );
        if (active) {
          setIndexUnavailable(false);
          setResults(hydrated);
        }
      } catch {
        if (active) {
          setResults([]);
          setIndexUnavailable(true);
        }
      }
    }
    runSearch();
    return () => {
      active = false;
    };
  }, [query, ready]);

  const showResults = useMemo(() => results.length > 0, [results]);
  const showIndexPending =
    query.trim().length >= 2 && indexUnavailable && !showResults;

  return (
    <div className="relative w-full max-w-full">
      <label className="sr-only" htmlFor="site-search">
        글 검색
      </label>
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <input
        id="site-search"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="글 검색"
        className="h-10 w-full rounded-md border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
      />
      {showResults ? (
        <div className="absolute right-0 top-12 z-50 w-full min-w-72 rounded-md border border-slate-200 bg-white p-2 shadow-xl">
          {results.map((result) => (
            <a
              key={result.url}
              href={result.url}
              className="block rounded-md px-3 py-2 text-sm hover:bg-slate-50"
            >
              <span className="font-medium text-slate-950">{result.title}</span>
              <span className="mt-1 line-clamp-2 block text-xs leading-5 text-slate-500">
                {result.excerpt}
              </span>
            </a>
          ))}
        </div>
      ) : null}
      {showIndexPending ? (
        <div
          className="absolute right-0 top-12 z-50 w-full min-w-72 rounded-md border border-slate-200 bg-white p-3 text-xs leading-5 text-slate-600 shadow-xl"
          role="status"
        >
          {SEARCH_INDEX_PENDING_MESSAGE}
        </div>
      ) : null}
    </div>
  );
}
