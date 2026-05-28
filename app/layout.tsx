import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import FloatingAssistant from "@/components/ai/FloatingAssistant";
import "./globals.css";

// Clerk is only loaded when a valid publishable key is present
const hasClerkKey =
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.startsWith("pk_");

// Conditional import to avoid boot errors without real keys
let ClerkProvider: React.ComponentType<{ children: React.ReactNode }> | null = null;
if (hasClerkKey) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  ClerkProvider = require("@clerk/nextjs").ClerkProvider;
}

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "AddValue Communications | Expert Business Services",
    template: "%s | AddValue Communications",
  },
  description:
    "Premium AI-assisted business services platform. Expert-led Finance, Advertisement, PR, Marketing & Insurance solutions for startups, creators, and enterprises.",
  keywords: [
    "business services",
    "marketing agency",
    "PR agency",
    "finance consulting",
    "insurance services",
    "advertisement",
    "AI business assistant",
    "startup services",
  ],
  authors: [{ name: "AddValue Communications" }],
  creator: "AddValue Communications",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://addvaluecommunications.com",
    siteName: "AddValue Communications",
    title: "AddValue Communications | Expert Business Services",
    description:
      "One platform. Multiple business solutions. AI-powered recommendations. Real experts. Real growth.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AddValue Communications",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AddValue Communications | Expert Business Services",
    description:
      "One platform. Multiple business solutions. AI-powered recommendations. Real experts. Real growth.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jakarta.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
          <FloatingAssistant />
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );

  if (ClerkProvider) {
    return <ClerkProvider>{content}</ClerkProvider>;
  }

  return content;
}
