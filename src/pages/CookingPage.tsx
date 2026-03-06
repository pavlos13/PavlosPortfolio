import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, ChefHat, X, Play } from "lucide-react";

const YOUTUBE_CHANNEL = "https://www.youtube.com/@pavlosrev";
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

// Featured cooking videos (always shown in the list)
const FEATURED_COOKING_VIDEOS: { id: string; url: string; thumbnail: string; title?: string; description?: string }[] = [
  {
    id: "zSS4_N3ysyQ",
    url: "https://www.youtube.com/shorts/zSS4_N3ysyQ",
    thumbnail: "https://img.youtube.com/vi/zSS4_N3ysyQ/mqdefault.jpg",
    title: "Cooking Short",
    description: "A cooking video from my channel.",
  },
];

interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  url: string;
}

async function fetchChannelUploadsPlaylistId(handleOrUsername: string): Promise<string | null> {
  const name = handleOrUsername.replace(/^@/, "");
  // forHandle works with @handle custom URLs; forUsername often fails for custom URLs
  let res = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=contentDetails,snippet&forHandle=${encodeURIComponent(name)}&key=${API_KEY}`
  );
  let data = await res.json();
  let channel = data?.items?.[0];
  if (!channel) {
    res = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails,snippet&forUsername=${encodeURIComponent(name)}&key=${API_KEY}`
    );
    data = await res.json();
    channel = data?.items?.[0];
  }
  return channel?.contentDetails?.relatedPlaylists?.uploads ?? null;
}

async function fetchPlaylistVideos(playlistId: string): Promise<YouTubeVideo[]> {
  const videos: YouTubeVideo[] = [];
  let nextPageToken: string | undefined;
  do {
    const url = new URL("https://www.googleapis.com/youtube/v3/playlistItems");
    url.searchParams.set("part", "snippet");
    url.searchParams.set("playlistId", playlistId);
    url.searchParams.set("maxResults", "50");
    url.searchParams.set("key", API_KEY!);
    if (nextPageToken) url.searchParams.set("pageToken", nextPageToken);
    const res = await fetch(url.toString());
    const data = await res.json();
    for (const item of data?.items ?? []) {
      const vid = item.snippet?.resourceId?.videoId;
      if (!vid) continue;
      videos.push({
        id: vid,
        title: item.snippet?.title ?? "",
        description: item.snippet?.description ?? "",
        thumbnail: item.snippet?.thumbnails?.medium?.url ?? item.snippet?.thumbnails?.default?.url ?? "",
        publishedAt: item.snippet?.publishedAt ?? "",
        url: `https://www.youtube.com/watch?v=${vid}`,
      });
    }
    nextPageToken = data?.nextPageToken;
  } while (nextPageToken);
  return videos;
}

async function fetchVideoDetails(videoIds: string[]): Promise<YouTubeVideo[]> {
  if (videoIds.length === 0) return [];
  const url = new URL("https://www.googleapis.com/youtube/v3/videos");
  url.searchParams.set("part", "snippet");
  url.searchParams.set("id", videoIds.join(","));
  url.searchParams.set("key", API_KEY!);
  const res = await fetch(url.toString());
  const data = await res.json();
  const list: YouTubeVideo[] = [];
  for (const item of data?.items ?? []) {
    const id = item.id;
    const sn = item.snippet ?? {};
    list.push({
      id,
      title: sn.title ?? "",
      description: sn.description ?? "",
      thumbnail: sn.thumbnails?.medium?.url ?? sn.thumbnails?.default?.url ?? "",
      publishedAt: sn.publishedAt ?? "",
      url: id.length === 11 ? `https://www.youtube.com/watch?v=${id}` : `https://www.youtube.com/shorts/${id}`,
    });
  }
  return list;
}

const COOKING_VIDEOS_JSON = "/cooking-videos.json";
const PORTFOLIO_API_BASE = import.meta.env.VITE_PORTFOLIO_API_URL ?? "http://localhost:8080";
const YOUTUBE_VIDEOS_API = `${PORTFOLIO_API_BASE}/api/youtube/videos`;

export function CookingPage() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPlayingVideoId(null);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        // 1) Use portfolio API (Spring Boot) for YouTube videos
        try {
          const res = await fetch(YOUTUBE_VIDEOS_API);
          if (res.ok) {
            const list = await res.json();
            if (Array.isArray(list) && !cancelled) {
              setVideos(list);
              setLoading(false);
              return;
            }
          }
          if (res.status === 503 && !cancelled) {
            setError("YouTube videos are temporarily unavailable. Set YOUTUBE_API_KEY on the API server.");
            setLoading(false);
            return;
          }
        } catch {
          // API not available, continue to fallbacks
        }
        if (cancelled) return;

        // 2) Static list (from npm run fetch-cooking-videos)
        const res = await fetch(COOKING_VIDEOS_JSON);
        if (res.ok) {
          const data = await res.json();
          const list = Array.isArray(data) ? data : data.videos ?? [];
          if (list.length > 0 && !cancelled) {
            setVideos(list);
            setLoading(false);
            return;
          }
        }
        if (cancelled) return;

        if (API_KEY) {
          const featuredIds = FEATURED_COOKING_VIDEOS.map((v) => v.id);
          const [featuredList, playlistId] = await Promise.all([
            fetchVideoDetails(featuredIds),
            fetchChannelUploadsPlaylistId("pavlosrev"),
          ]);
          if (cancelled) return;
          const featuredIdSet = new Set(featuredIds);
          let list: YouTubeVideo[] = [];
          if (playlistId) {
            const channelList = await fetchPlaylistVideos(playlistId);
            list = [...featuredList, ...channelList.filter((v) => !featuredIdSet.has(v.id))];
          } else {
            list = featuredList;
          }
          if (!cancelled) setVideos(list);
        } else {
          setVideos(FEATURED_COOKING_VIDEOS.map((v) => ({
            id: v.id,
            title: v.title ?? "Cooking video",
            description: v.description ?? "",
            thumbnail: v.thumbnail,
            publishedAt: "",
            url: v.url,
          })));
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to load videos.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="container-wide section-padding">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 mb-8"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden />
          Back to portfolio
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <ChefHat className="w-10 h-10 text-emerald-600 dark:text-emerald-400" aria-hidden />
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Cooking videos</h1>
          </div>
          <p className="text-slate-600 dark:text-slate-400">
            Recipes and cooking from my YouTube channel. Each video includes a short description below.
          </p>
        </header>

        {loading && (
          <div className="text-center py-12 text-slate-600 dark:text-slate-400">Loading videos…</div>
        )}

        {error && (
          <div className="rounded-xl border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/30 p-6 text-red-800 dark:text-red-200">
            {error}
            <p className="mt-4 text-sm">
              <a href={YOUTUBE_CHANNEL} target="_blank" rel="noopener noreferrer" className="underline">
                Open YouTube channel
              </a>
            </p>
          </div>
        )}

        {!loading && !error && videos.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <article
                key={video.id}
                className="bg-white dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <button
                  type="button"
                  onClick={() => setPlayingVideoId(video.id)}
                  className="relative block w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 rounded-t-xl overflow-hidden"
                  aria-label={`Play ${video.title}`}
                >
                  <img
                    src={video.thumbnail}
                    alt=""
                    className="w-full aspect-video object-cover"
                    width={640}
                    height={360}
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
                    <span className="w-14 h-14 rounded-full bg-emerald-600 flex items-center justify-center">
                      <Play className="w-7 h-7 text-white ml-1" fill="currentColor" aria-hidden />
                    </span>
                  </span>
                </button>
                <div className="p-4">
                  <h2 className="font-semibold text-slate-900 dark:text-white line-clamp-2">
                    <button
                      type="button"
                      onClick={() => setPlayingVideoId(video.id)}
                      className="text-left hover:text-emerald-600 dark:hover:text-emerald-400"
                    >
                      {video.title}
                    </button>
                  </h2>
                  {video.publishedAt && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {new Date(video.publishedAt).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  )}
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 line-clamp-3">
                    {video.description || "No description."}
                  </p>
                  <div className="mt-3 flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => setPlayingVideoId(video.id)}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:underline"
                    >
                      <Play className="w-4 h-4" aria-hidden />
                      Play here
                    </button>
                    <a
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                    >
                      Open on YouTube
                      <ExternalLink className="w-4 h-4" aria-hidden />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {!loading && !error && videos.length === 0 && (
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-8 text-center">
            <p className="text-slate-600 dark:text-slate-400 mb-4">No videos loaded.</p>
            <a
              href={YOUTUBE_CHANNEL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 transition-colors"
            >
              <ExternalLink className="w-5 h-5" aria-hidden />
              Open YouTube channel
            </a>
            <p className="text-sm text-slate-500 dark:text-slate-500 mt-6">
              To show all channel videos here, add <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded">VITE_YOUTUBE_API_KEY</code> in <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded">.env</code> or run <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded">npm run fetch-cooking-videos</code> to generate a static list.
            </p>
          </div>
        )}

        {/* Video player modal – play on same page */}
        {playingVideoId && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
            role="dialog"
            aria-modal="true"
            aria-label="Video player"
            onClick={() => setPlayingVideoId(null)}
          >
            <div
              className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setPlayingVideoId(null)}
                className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
                aria-label="Close video"
              >
                <X className="w-6 h-6" aria-hidden />
              </button>
              <iframe
                src={`https://www.youtube.com/embed/${playingVideoId}?autoplay=1`}
                title="YouTube video player"
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
