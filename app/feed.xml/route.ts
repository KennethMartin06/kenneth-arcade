import { devLog } from "@/lib/data";
import { profile } from "@/lib/data";

// RSS 2.0 feed for the Dev Log. Static, cached indefinitely by Next.
export const dynamic = "force-static";

function escape(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const site = profile.portfolio.replace(/\/$/, "");
  const items = devLog
    .map((e) => {
      const url = `${site}/?devlog=${e.id}`;
      const pub = new Date(e.date).toUTCString();
      const body = e.body.map((p) => `<p>${escape(p)}</p>`).join("");
      return `
    <item>
      <title>${escape(e.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="false">${e.id}</guid>
      <pubDate>${pub}</pubDate>
      <category>${escape(e.tag)}</category>
      <description>${escape(e.excerpt)}</description>
      <content:encoded><![CDATA[${body}]]></content:encoded>
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${escape(profile.name)} — Dev Log</title>
    <link>${site}</link>
    <description>Engineering notes from Kenneth Martin's second brain.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
