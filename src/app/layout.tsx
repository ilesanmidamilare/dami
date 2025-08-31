import type { Metadata } from "next";
import { Raleway } from 'next/font/google'
import "./globals.css";

const raleway = Raleway({
  weight: ["500", "600", "700", '900'],
  variable: "--font-raleway",
  subsets: ["latin"],
})


export const metadata: Metadata = {
  title: "Damilare Ilesanmi",
  description: "I build scalabe web and mobile applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${raleway.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}


