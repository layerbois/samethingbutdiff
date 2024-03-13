'use client'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { useEffect, useState } from "react";
import { MultiStepLoader } from "@/components/ui/multi-step-loader";

const inter = Inter({ subsets: ["latin"] });

const loadingStates = [
  {
    text: "Buying a condo",
  },
  {
    text: "Travelling in a flight",
  },
  {
    text: "Meeting Tyler Durden",
  },
  {
    text: "He makes soap",
  },
  {
    text: "We goto a bar",
  },
  {
    text: "Start a fight",
  },
  {
    text: "We like it",
  },
  {
    text: "Welcome to F**** C***",
  },
];



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 4000)

  return (
    <html lang="en">
      <body className="bg-violet-800">
      {loading && <MultiStepLoader loadingStates={loadingStates} loading={loading} duration={2000} />}
        {children}
      </body>
    </html>
  );
}
