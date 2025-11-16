import fs from "fs";
import path from "path";
import CopyButton from "../components/copy-button";

const scriptPath = path.join(process.cwd(), "public", "best-tweaks.bat");
const scriptContent = fs
  .readFileSync(scriptPath, "utf-8")
  .replace(/\r\n/g, "\n")
  .trimEnd();
const scriptLines = scriptContent.split("\n");

const featureHighlights = [
  {
    title: "Black + crimson atmosphere",
    description:
      "Boots straight into a razor-sharp black console with a deep red accent, sizing the window for breathing room and setting the tone with a cinematic banner.",
    icon: "🎨",
  },
  {
    title: "Smart session upgrades",
    description:
      "Refreshes the command prompt, loads quality-of-life shortcuts, and drops you into a tuned workspace without touching global settings.",
    icon: "⚡",
  },
  {
    title: "One-tap maintenance",
    description:
      "Curated menu hooks into trusted Windows utilities — DNS flush, Disk Cleanup, Startup Apps, and a quick system report — all behind a clean UI.",
    icon: "🛠️",
  },
  {
    title: "Admin-aware safeguards",
    description:
      "Detects elevation, protects sensitive tools like SFC and DISM, and guides you when more privileges are required.",
    icon: "🛡️",
  },
];

const quickShortcuts = [
  { name: "ll", action: "dir /a", description: "List everything with hidden/system files visible." },
  { name: "..", action: "cd ..", description: "Jump up one directory instantly." },
  { name: "home", action: "cd /d %USERPROFILE%", description: "Snap back to your profile root." },
  { name: "update", action: "winget upgrade --all --include-unknown", description: "Sweep for app updates with winget." },
  { name: "cleanup", action: "cleanmgr /lowdisk", description: "Launch Disk Cleanup in low disk mode." },
  { name: "sysinfo", action: "systeminfo", description: "Print a comprehensive system summary." },
];

const usageSteps = [
  "Download the batch file below and keep it somewhere handy (Desktop or a tools folder works great).",
  "Right-click → Run as administrator when you need elevated repairs (menu items #4 and #5). Regular launch works for everything else.",
  "Pick your tweak, let the script run it, and keep the console open for the built-in power shortcuts.",
];

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-black via-black to-[#220308]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-64 bg-[radial-gradient(circle_at_top,_#ff2d55_0%,_rgba(0,0,0,0)_60%)] opacity-40 blur-3xl" />
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-16 px-6 py-16 lg:px-10">
        <header className="flex flex-col gap-6">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-red-200">
            Redline Batch Suite
          </span>
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-red-50 sm:text-5xl">
            Launch a black and crimson Windows console that ships with the best everyday tweaks pre-wired.
          </h1>
          <p className="max-w-2xl text-base leading-7 text-red-100/80">
            The <strong className="text-red-200">best-tweaks.bat</strong> script opens a red-accented command shell, loads productivity shortcuts,
            and gives you a curated maintenance dashboard — all in one lightweight, reversible batch file.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-red-100/70">
            <a
              href="/best-tweaks.bat"
              download
              className="inline-flex items-center gap-2 rounded-md border border-red-400/60 bg-red-500/20 px-4 py-2 font-medium text-red-50 transition hover:bg-red-500/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400/70"
            >
              Download best-tweaks.bat
            </a>
            <span>✔ Portable · ⚙️ No install · 🛡️ Admin-aware</span>
          </div>
        </header>

        <section className="grid gap-5 md:grid-cols-2">
          {featureHighlights.map((feature) => (
            <article
              key={feature.title}
              className="rounded-xl border border-red-500/30 bg-black/70 p-6 text-red-100 shadow-[0_0_30px_rgba(255,45,85,0.08)] backdrop-blur"
            >
              <div className="mb-3 text-2xl">{feature.icon}</div>
              <h2 className="text-lg font-semibold text-red-50">{feature.title}</h2>
              <p className="mt-2 text-sm leading-6 text-red-100/80">{feature.description}</p>
            </article>
          ))}
        </section>

        <section className="rounded-2xl border border-red-500/30 bg-black/80 p-6 shadow-[0_0_40px_rgba(255,45,85,0.08)] backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs font-semibold uppercase tracking-[0.4em] text-red-200">
              Batch source
            </span>
            <CopyButton text={scriptContent} />
          </div>
          <div className="mt-4 max-h-[420px] overflow-auto rounded-lg border border-red-500/20 bg-black/70 p-4 text-sm leading-relaxed text-red-100">
            <pre className="font-mono text-[13px] leading-relaxed">
              {scriptLines.map((line, index) => (
                <span key={index} className="block whitespace-pre">
                  {line === "" ? " " : line}
                </span>
              ))}
            </pre>
          </div>
        </section>

        <section className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-2xl border border-red-500/30 bg-black/75 p-6 text-red-100 shadow-[0_0_40px_rgba(255,45,85,0.08)] backdrop-blur">
            <h2 className="text-xl font-semibold text-red-50">How to run it</h2>
            <ol className="mt-4 space-y-4 text-sm leading-6 text-red-100/80">
              {usageSteps.map((step, index) => (
                <li key={step} className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-red-400/40 bg-red-500/15 text-xs font-semibold text-red-200">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-2xl border border-red-500/30 bg-black/75 p-6 text-red-100 shadow-[0_0_40px_rgba(255,45,85,0.08)] backdrop-blur">
            <h2 className="text-xl font-semibold text-red-50">Power shortcuts (per session)</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-red-100/80">
              {quickShortcuts.map((shortcut) => (
                <li key={shortcut.name} className="flex flex-col">
                  <span className="font-semibold text-red-50">
                    {shortcut.name}{" "}
                    <span className="text-xs font-normal tracking-wide text-red-200/80">
                      → {shortcut.action}
                    </span>
                  </span>
                  <span>{shortcut.description}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <footer className="rounded-2xl border border-red-500/30 bg-black/70 p-6 text-sm text-red-100/70 shadow-[0_0_30px_rgba(255,45,85,0.08)] backdrop-blur">
          <p>
            Need to reset? Just close the window — no registry edits, no lingering services. When you
            want the crimson command center again, launch <code className="text-red-200">best-tweaks.bat</code> and
            you&apos;re back in the groove.
          </p>
        </footer>
      </main>
    </div>
  );
}
