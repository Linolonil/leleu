// app/components/ConfettiScript.tsx
"use client";

import Script from "next/script";

export function ConfettiScript() {
  return (
    <Script
      src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js"
      strategy="afterInteractive" // ou 'beforeInteractive' se for crítico
      onLoad={() => {
        console.log("Confetti script carregado!");
      }}
    />
  );
}