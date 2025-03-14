import "./globals.css";

import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner"
import { auth } from "@/auth";
import localFont from "next/font/local"

const ibmPlexSans = localFont({
  src: [
    { path: '/fonts/IBMPlexSans-Regular.ttf', weight: '400', style: 'normal'},
    { path: '/fonts/IBMPlexSans-Medium.ttf', weight: '500', style: 'normal'},
    { path: '/fonts/IBMPlexSans-SemiBold.ttf', weight: '600', style: 'normal'},
    { path: '/fonts/IBMPlexSans-Bold.ttf', weight: '700', style: 'normal'},
  ],
});

const bebasNeue = localFont({
  src: [
    { path: "/fonts/BebasNeue-Regular.ttf", weight: '400', style: 'normal' }
  ],
  variable: '--bebas-neue',
})

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Bookwise",
  description: "Book borrowing manangement system",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth();
  return (
    <html lang="en">
      <SessionProvider session={session}>
      <body
        className={`${ibmPlexSans.className} ${bebasNeue.variable} antialiased`}
      >
        {children}
        
        <Toaster />
      </body>
      </SessionProvider>
      
    </html>
  );
}
