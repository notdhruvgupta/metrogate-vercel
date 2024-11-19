import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { GoogleAnalytics } from '@next/third-parties/google'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL('https://www.metrogate.in'),
  title: {
    default: "MetroGate",
    template: "%s - MetroGate"
  },
  description: "Metrogate.in is Your Ultimate Destination for Seamless Delhi Travel! Whether you're a local commuter or a first-time visitor, Metrogate.in is here to revolutionize your travel experience in the bustling city of Delhi. With our comprehensive platform, we offer an all-in-one solution to navigate the city's transport system, with a particular focus on the Delhi Metro.",
  twitter: {
    card: "summary_large_image"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* ADSENSE ADDED */}
      <head>
        {process.env.NODE_ENV === "production" && (
          <Script
            id="googleAds"
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1171019702231307"
            crossorigin="anonymous"
          >
          </Script>
        )}
      </head>
      <Script id="googleManager" async src="https://www.googletagmanager.com/gtag/js?id=G-B75E1R4ZQB"></Script>
      <GoogleAnalytics gaId="G-B75E1R4ZQB" />
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
