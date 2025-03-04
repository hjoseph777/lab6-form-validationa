import type { Metadata } from "next";
import "../../styles/globals.css";

export const metadata: Metadata = {
  title: "Form Validation Demo",
  description: "Interactive form with real-time validation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
