import type { Metadata } from "next";
import { Open_Sans, Pacifico } from "next/font/google";
import "./globals.css";
import Providers from "./providers"

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

const pacifico = Pacifico({
  variable: "--font-pacifico",
  subsets: ["latin"],
  weight: "400"
});

export const metadata: Metadata = {
  title: "Phishguard",
  description: "Detect malicious/phishing emails",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${openSans.variable} ${pacifico.variable} h-full antialiased`}>
        <Providers>
          <body className="min-h-full flex flex-col">{children}</body>
        </Providers>
    </html>
  );
}
