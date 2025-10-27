import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ChayaJudge",
  description: "A online scoresheet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
