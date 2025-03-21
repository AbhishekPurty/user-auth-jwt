import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cookies, headers } from "next/headers";
import { redirect,} from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {

    const cookieStore = await cookies();
    const token = cookieStore.get('userToken') || '';
    const headerList = await headers();
    const host = headerList.get('host') || '';
    const currentPath = headerList.get('x-current-path');
    console.log("Token", token)
    console.log("Current path",currentPath)
    console.log("Host",host)


  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
