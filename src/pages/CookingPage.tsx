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
    <div>
      <div className="container-wide section-padding">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.06em] uppercase text-mist2 hover:text-accent mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden />
          Back to portfolio
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <ChefHat className="w-9 h-9 text-accent" aria-hidden />
            <h1 className="m-0 font-bold text-3xl sm:text-4xl tracking-[-0.03em] text-ink">Cooking videos</h1>
          </div>
          <p className="m-0 max-w-[620px] text-mist leading-relaxed">
            Recipes and cooking from my YouTube channel. Each video includes a short description below.
          </p>
        </header>

        {loading && (
          <div className="py-12 font-mono text-xs tracking-[0.08em] uppercase text-mist3">Loading videos…</div>
        )}

        {error && (
          <div className="border border-hair2 p-6 text-mist">
            {error}
            <p className="mt-4 font-mono text-xs">
              <a href={YOUTUBE_CHANNEL} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-hover">
                Open YouTube channel
              </a>
            </p>
          </div>
        )}

        {!loading && !error && videos.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <article key={video.id} className="border border-hair flex flex-col">
                <button
                  type="button"
                  onClick={() => setPlayingVideoId(video.id)}
                  className="relative block w-full overflow-hidden"
                  aria-label={`Play ${video.title}`}
                >
                  <img
                    src={video.thumbnail}
                    alt=""
                    className="w-full aspect-video object-cover"
                    width={640}
                    height={360}
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-bg/40 opacity-0 hover:opacity-100 transition-opacity">
                    <span className="w-12 h-12 rounded-[10px] bg-accent grid place-items-center">
                      <Play className="w-5 h-5 text-accent-ink ml-0.5" fill="currentColor" aria-hidden />
                    </span>
                  </span>
                </button>
                <div className="p-4 flex flex-col flex-1 border-t border-hair">
                  <h2 className="m-0 font-semibold text-ink leading-snug line-clamp-2">
                    <button
                      type="button"
                      onClick={() => setPlayingVideoId(video.id)}
                      className="text-left hover:text-accent transition-colors"
                    >
                      {video.title}
                    </button>
                  </h2>
                  {video.publishedAt && (
                    <p className="mt-2 mb-0 font-mono text-[11px] tracking-[0.06em] uppercase text-mist3">
                      {new Date(video.publishedAt).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  )}
                  <p className="mt-2 mb-0 text-sm leading-relaxed text-mist line-clamp-3">
                    {video.description || "No description."}
                  </p>
                  <div className="mt-auto pt-4 flex items-center gap-4 font-mono text-[11px] tracking-[0.06em] uppercase">
                    <button
                      type="button"
                      onClick={() => setPlayingVideoId(video.id)}
                      className="inline-flex items-center gap-1.5 text-accent hover:text-accent-hover transition-colors"
                    >
                      <Play className="w-3.5 h-3.5" aria-hidden />
                      Play here
                    </button>
                    <a
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-accent hover:text-accent-hover transition-colors"
                    >
                      YouTube
                      <ExternalLink className="w-3.5 h-3.5" aria-hidden />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {!loading && !error && videos.length === 0 && (
          <div className="border border-hair p-8">
            <p className="m-0 mb-4 text-mist">No videos loaded.</p>
            <a
              href={YOUTUBE_CHANNEL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[10px] bg-accent text-accent-ink font-semibold text-[15px] hover:bg-accent-hover transition-colors"
            >
              <ExternalLink className="w-4 h-4" aria-hidden />
              Open YouTube channel
            </a>
            <p className="mt-6 mb-0 font-mono text-xs text-mist3 leading-relaxed">
              To show all channel videos here, add <code className="text-mist4">VITE_YOUTUBE_API_KEY</code> in{" "}
              <code className="text-mist4">.env</code> or run <code className="text-mist4">npm run fetch-cooking-videos</code>{" "}
              to generate a static list.
            </p>
          </div>
        )}

        {playingVideoId && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg/85"
            role="dialog"
            aria-modal="true"
            aria-label="Video player"
            onClick={() => setPlayingVideoId(null)}
          >
            <div
              className="relative w-full max-w-4xl aspect-video bg-bg border border-hair2 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setPlayingVideoId(null)}
                className="absolute top-3 right-3 z-10 w-10 h-10 rounded-[10px] border border-hair2 bg-bg text-ink hover:border-accent hover:text-accent transition-colors grid place-items-center"
                aria-label="Close video"
              >
                <X className="w-5 h-5" aria-hidden />
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
