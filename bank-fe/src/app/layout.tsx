import { ReduxProvider } from "@/providers/redux-provider";
import { ToasterProvider } from "@/providers/toaster-provider";
import "./globals.css";
import InitAppProvider from "@/components/layout/init-provider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Bank system",
    default: "Bank system | Bank System",
  },
  description: "Bank system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
      </head>
      <body className="font-regular">
        <ReduxProvider>
          <InitAppProvider>
            {children}
            <ToasterProvider />
          </InitAppProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
