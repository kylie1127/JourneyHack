import "./globals.css";
import { Jersey_10 } from "next/font/google";

const jersey = Jersey_10({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-jersey",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jersey.variable}>
      <body>{children}</body>
    </html>
  );
}
