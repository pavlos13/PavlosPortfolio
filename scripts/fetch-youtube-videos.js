/**
 * Fetches all videos from YouTube channel @pavlosrev and writes them to public/cooking-videos.json.
 * Run with: VITE_YOUTUBE_API_KEY=your_key node scripts/fetch-youtube-videos.js
 * Or add VITE_YOUTUBE_API_KEY to .env and run: node scripts/fetch-youtube-videos.js
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const envPath = join(root, ".env");
const outPath = join(root, "public", "cooking-videos.json");

function loadEnv() {
  if (!existsSync(envPath)) return process.env.VITE_YOUTUBE_API_KEY;
  const content = readFileSync(envPath, "utf8");
  for (const line of content.split("\n")) {
    const m = line.match(/^\s*VITE_YOUTUBE_API_KEY\s*=\s*(.+?)\s*$/);
    if (m) return m[1].replace(/^["']|["']$/g, "").trim();
  }
  return process.env.VITE_YOUTUBE_API_KEY;
}

const API_KEY = loadEnv();
if (!API_KEY) {
  console.error("Missing VITE_YOUTUBE_API_KEY. Set it in .env or run with VITE_YOUTUBE_API_KEY=your_key node scripts/fetch-youtube-videos.js");
  process.exit(1);
}

const CHANNEL_USERNAME = "pavlosrev";

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${url}`);
  return res.json();
}

async function getUploadsPlaylistId() {
  // forHandle works with @handle custom URLs; forUsername is legacy and often fails
  const handle = CHANNEL_USERNAME.replace(/^@/, "");
  let url = `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forHandle=${encodeURIComponent(handle)}&key=${API_KEY}`;
  let data = await fetchJson(url);
  let channel = data?.items?.[0];
  if (!channel) {
    url = `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forUsername=${encodeURIComponent(handle)}&key=${API_KEY}`;
    data = await fetchJson(url);
    channel = data?.items?.[0];
  }
  const playlistId = channel?.contentDetails?.relatedPlaylists?.uploads;
  if (!playlistId) throw new Error("Could not get channel uploads playlist");
  return playlistId;
}

async function fetchAllPlaylistVideos(playlistId) {
  const videos = [];
  let pageToken;
  do {
    const params = new URLSearchParams({
      part: "snippet",
      playlistId,
      maxResults: "50",
      key: API_KEY,
    });
    if (pageToken) params.set("pageToken", pageToken);
    const data = await fetchJson(`https://www.googleapis.com/youtube/v3/playlistItems?${params}`);
    for (const item of data?.items ?? []) {
      const vid = item.snippet?.resourceId?.videoId;
      if (!vid) continue;
      const sn = item.snippet;
      videos.push({
        id: vid,
        title: sn?.title ?? "",
        description: sn?.description ?? "",
        thumbnail: sn?.thumbnails?.medium?.url ?? sn?.thumbnails?.default?.url ?? `https://img.youtube.com/vi/${vid}/mqdefault.jpg`,
        publishedAt: sn?.publishedAt ?? "",
        url: `https://www.youtube.com/watch?v=${vid}`,
      });
    }
    pageToken = data?.nextPageToken;
  } while (pageToken);
  return videos;
}

async function main() {
  console.log("Fetching channel uploads playlist…");
  const playlistId = await getUploadsPlaylistId();
  console.log("Fetching all playlist videos…");
  const videos = await fetchAllPlaylistVideos(playlistId);
  console.log(`Found ${videos.length} videos.`);
  writeFileSync(outPath, JSON.stringify(videos, null, 2), "utf8");
  console.log(`Written to ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
