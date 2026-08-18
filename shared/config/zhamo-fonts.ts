import { Familjen_Grotesk, IBM_Plex_Mono, Instrument_Sans } from "next/font/google";

export const familjenGrotesk = Familjen_Grotesk({
  variable: "--font-zhamo-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const instrumentSans = Instrument_Sans({
  variable: "--font-zhamo-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-zhamo-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const zhamoFontVariables = `${familjenGrotesk.variable} ${instrumentSans.variable} ${ibmPlexMono.variable}`;
