/**
 * Merges the latest uploads from the channel RSS feed into public/cooking-videos.json.
 * Needs no API key, but the feed only exposes the 15 most recent uploads.
 * Run with: node scripts/fetch-youtube-rss.js
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, "..", "public", "cooking-videos.json");

const CHANNEL_ID = "UCD98NyYpOesDDXygGMAu_9w"; // @pavlosrev
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

function decodeEntities(value) {
  return value
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)))
    .replace(/&amp;/g, "&");
}

function tag(entry, name) {
  const m = entry.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`));
  return m ? decodeEntities(m[1]).trim() : "";
}

function parseFeed(xml) {
  return [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map(([, entry]) => {
    const id = tag(entry, "yt:videoId");
    return {
      id,
      title: tag(entry, "title"),
      description: tag(entry, "media:description"),
      thumbnail: `https://i.ytimg.com/vi/${id}/mqdefault.jpg`,
      publishedAt: new Date(tag(entry, "published")).toISOString().replace(/\.\d{3}Z$/, "Z"),
      url: `https://www.youtube.com/watch?v=${id}`,
    };
  });
}

const res = await fetch(FEED_URL);
if (!res.ok) throw new Error(`HTTP ${res.status}: ${FEED_URL}`);
const feedVideos = parseFeed(await res.text());
if (feedVideos.length === 0) throw new Error("No entries found in feed");

const existing = existsSync(outPath) ? JSON.parse(readFileSync(outPath, "utf8")) : [];
const byId = new Map(existing.map((v) => [v.id, v]));
let added = 0;
for (const video of feedVideos) {
  if (byId.has(video.id)) continue;
  byId.set(video.id, video);
  added += 1;
}

const merged = [...byId.values()].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
writeFileSync(outPath, `${JSON.stringify(merged, null, 2)}\n`, "utf8");
console.log(`Added ${added} new video(s). Total: ${merged.length}. Written to ${outPath}`);
