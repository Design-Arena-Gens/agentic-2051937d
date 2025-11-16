'use client';

import { useState } from "react";

type CopyButtonProps = {
  text: string;
  label?: string;
};

const CopyButton = ({ text, label = "Copy script" }: CopyButtonProps) => {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("copied");
      setTimeout(() => setStatus("idle"), 2000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2000);
    }
  };

  const statusLabel =
    status === "copied"
      ? "Copied!"
      : status === "error"
        ? "Copy failed"
        : label;

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="rounded-md border border-red-400/60 bg-red-500/10 px-3 py-2 text-sm font-medium text-red-200 transition hover:bg-red-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400/70"
    >
      {statusLabel}
    </button>
  );
};

export default CopyButton;
