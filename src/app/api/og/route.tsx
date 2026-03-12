import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const bg = searchParams.get("bg") || "bg-zinc-900";
    const text = searchParams.get("text") || "（※LGTM）";
    const mode = searchParams.get("mode") || "color";

    let bgColor = "#18181b";
    let bgImage = null;

    if (mode === "meme") {
      // For memes, we use the absolute URL to the public image
      const host = req.headers.get("host") || "localhost:3000";
      const protocol = host.includes("localhost") ? "http" : "https";
      bgImage = `${protocol}://${host}/memes/${bg}.png`;
    } else {
      if (bg.includes("purple-500")) bgColor = "#a855f7";
      else if (bg.includes("cyan-500")) bgColor = "#06b6d4";
      else if (bg.includes("gray-900")) bgColor = "#111827";
      else if (bg.includes("green-400")) bgColor = "#4ade80";
      else if (bg.includes("orange-400")) bgColor = "#fb923c";
      else if (bg.includes("emerald-500")) bgColor = "#10b981";
      else if (bg.includes("indigo-500")) bgColor = "#6366f1";
      else if (bg.includes("rose-500")) bgColor = "#f43f5e";
      else if (bg.includes("amber-500")) bgColor = "#f59e0b";
      else if (bg.includes("slate-800")) bgColor = "#1e293b";
    }

    const textLength = text.length;
    let fontSize = 120;
    if (textLength > 20) fontSize = 60;
    else if (textLength > 15) fontSize = 80;
    else if (textLength > 10) fontSize = 100;

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: bgColor,
            position: "relative",
            overflow: "hidden",
            fontFamily: "sans-serif",
          }}
        >
          {bgImage && (
            <img
              src={bgImage}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                zIndex: 0,
              }}
            />
          )}
          {!bgImage && (
            <div
              style={{
                position: "absolute",
                top: "-50%",
                left: "-10%",
                width: "120%",
                height: "120%",
                background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.5) 100%)",
                zIndex: 0,
              }}
            />
          )}

          <div
            style={{
              position: "absolute",
              top: 40,
              left: 40,
              display: "flex",
              fontSize: 60,
              fontWeight: 900,
              color: "rgba(255,255,255,0.7)",
              zIndex: 2,
              textShadow: "0px 2px 10px rgba(0,0,0,0.5)",
            }}
          >
            LGTM
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              fontSize: fontSize,
              fontWeight: 900,
              color: "#fff",
              zIndex: 1,
              textAlign: "center",
              padding: "20px 40px",
              backgroundColor: bgImage ? "rgba(0,0,0,0.7)" : "transparent",
              borderRadius: "30px",
              border: bgImage ? "4px solid #fcd34d" : "none",
              maxWidth: "95%",
              textShadow: "0px 8px 30px rgba(0,0,0,1), 0px 0px 10px rgba(252,211,77,0.5)",
            }}
          >
            <span style={{ color: "#fcd34d", whiteSpace: "nowrap" }}>{text}</span>
          </div>

          <div
            style={{
              position: "absolute",
              bottom: 30,
              right: 40,
              display: "flex",
              fontSize: 18,
              fontWeight: 600,
              color: "rgba(255,255,255,0.4)",
              zIndex: 1,
            }}
          >
            本音ダダ漏れジェネレーター
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.error(e);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}