import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LaundryPro — Enterprise Laundry POS",
  description: "Advanced laundry management for modern businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="swiss-paper antialiased">
        {children}
      </body>
    </html>
  );
}
