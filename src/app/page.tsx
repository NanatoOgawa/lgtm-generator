"use client";

import { useState } from "react";
import { Download, RefreshCw, Wand2, Type } from "lucide-react";

// テンプレート画像のリスト（今回は仮のカラーグラデーションなどを想定）
// テンプレート画像のリスト
const TEMPLATES = [
  { id: "1", name: "ドリーム", bg: "bg-linear-to-br from-purple-500 to-pink-500" },
  { id: "2", name: "サイバー", bg: "bg-linear-to-r from-cyan-500 to-blue-500" },
  { id: "3", name: "フォレスト", bg: "bg-linear-to-tr from-emerald-500 to-teal-600" },
  { id: "4", name: "サンセット", bg: "bg-linear-to-bl from-orange-400 to-rose-400" },
  { id: "5", name: "ミッドナイト", bg: "bg-linear-to-br from-indigo-500 to-purple-800" },
  { id: "6", name: "ボルケーノ", bg: "bg-linear-to-r from-rose-500 to-orange-400" },
  { id: "7", name: "オーシャン", bg: "bg-linear-to-tr from-blue-400 to-emerald-400" },
  { id: "8", name: "サニー", bg: "bg-linear-to-br from-amber-400 to-orange-500" },
  { id: "9", name: "ディープ", bg: "bg-linear-to-br from-slate-800 to-zinc-900" },
  { id: "10", name: "ネオン", bg: "bg-linear-to-r from-fuchsia-500 to-purple-600" },
];

// 煽り文句のプリセット
const PRESETS = [
  "（※コード一切読んでないけど）",
  "（※本番でバグらないことを祈ります）",
  "（※動けばヨシ！）",
  "（※まあいっか、ヨシ！）",
  "（※LGTM（Looks Garbage To Me））",
];

export default function Home() {
  const [selectedTemplate, setSelectedTemplate] = useState(TEMPLATES[0]);
  const [customText, setCustomText] = useState(PRESETS[0]);
  const [isGenerating, setIsGenerating] = useState(false);

  // プレビュー用パラメータ
  const previewUrl = `/api/og?bg=${encodeURIComponent(selectedTemplate.bg)}&text=${encodeURIComponent(customText)}`;

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch(previewUrl);
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `lgtm-da-da-more-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    } catch (e) {
      console.error("Download failed:", e);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      
      {/* Header */}
      <div className="text-center w-full max-w-4xl mb-12 space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
          本音ダダ漏れ <br className="sm:hidden" />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-rose-500 to-purple-600">
            煽りLGTMジェネレーター
          </span>
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
          「LGTM（Looks Good To Me）」の承認に、強烈な本音（サブテキスト）を添えて送りつけよう。
        </p>
      </div>

      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Left Column: Preview */}
        <div className="flex flex-col space-y-6 lg:sticky lg:top-8 order-2 lg:order-1">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl shadow-zinc-200/50 dark:shadow-none border border-zinc-200 dark:border-zinc-800 p-4 overflow-hidden">
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={previewUrl} 
                alt="LGTM Preview" 
                className="w-full h-full object-cover transition-transform duration-500"
                crossOrigin="anonymous"
              />
              
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <button 
                  onClick={handleDownload}
                  disabled={isGenerating}
                  className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 bg-white/90 dark:bg-zinc-900/90 text-zinc-900 dark:text-white px-6 py-3 rounded-full font-bold shadow-lg backdrop-blur-sm flex items-center gap-2 hover:scale-105 active:scale-95 disabled:opacity-50"
                >
                  {isGenerating ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
                  {isGenerating ? "生成中..." : "画像をダウンロード"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Controls */}
        <div className="flex flex-col space-y-8 order-1 lg:order-2 bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-3xl shadow-sm border border-zinc-200 dark:border-zinc-800">
          
          {/* Section 1: 煽り文句 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-zinc-800 dark:text-zinc-200 font-bold text-lg">
              <Type className="w-5 h-5 text-rose-500" />
              <h2>1. 本音（煽り文句）を入力</h2>
            </div>
            
            <div className="space-y-3">
              <input 
                type="text" 
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="（※ここに入力）"
                className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-all text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 font-medium"
              />
              
              <div className="flex flex-wrap gap-2 pt-2">
                {PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCustomText(preset)}
                    className="px-3 py-1.5 text-sm font-medium rounded-lg border transition-colors
                      bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 
                      text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700
                      hover:text-zinc-900 dark:hover:text-white hover:border-zinc-300 dark:hover:border-zinc-600"
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <hr className="border-t border-zinc-100 dark:border-zinc-800" />

          {/* Section 2: 背景テンプレート */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-zinc-800 dark:text-zinc-200 font-bold text-lg">
              <Wand2 className="w-5 h-5 text-purple-500" />
              <h2>2. 背景を選ぶ</h2>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {TEMPLATES.map((tmpl) => (
                <button
                  key={tmpl.id}
                  onClick={() => setSelectedTemplate(tmpl)}
                  className={`
                    relative aspect-video rounded-xl overflow-hidden border-2 transition-all p-1
                    ${selectedTemplate.id === tmpl.id 
                      ? "border-purple-500 shadow-md scale-[1.02]" 
                      : "border-transparent hover:border-purple-300 hover:scale-[1.01] opacity-80 hover:opacity-100"
                    }
                  `}
                >
                  <div className={`w-full h-full rounded-lg ${tmpl.bg}`} />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="bg-black/40 text-white text-xs font-bold px-2 py-1 rounded backdrop-blur-sm">
                      {tmpl.name}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Download Button */}
          <div className="pt-6 lg:hidden">
             <button 
                onClick={handleDownload}
                disabled={isGenerating}
                className="w-full flex items-center justify-center gap-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 py-4 rounded-xl font-bold shadow-lg shadow-zinc-900/20 active:scale-95 transition-transform disabled:opacity-70"
              >
                {isGenerating ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
                {isGenerating ? "生成中..." : "LGTM画像をダウンロード"}
              </button>
          </div>

        </div>
      </div>
    </div>
  );
}
