import React from "react";
import "./globals.css";

export const metadata = {
  title: "ABTalks — 60-Day Coding Sprint Platform",
  description: "A premium mobile-first 60-day coding challenge platform for Indian engineering students.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#050505] text-[#ededed] font-sans antialiased selection:bg-indigo-500/30">
        <div className="min-h-screen flex flex-col justify-between max-w-7xl mx-auto">
          {children}
        </div>
      </body>
    </html>
  );
}
