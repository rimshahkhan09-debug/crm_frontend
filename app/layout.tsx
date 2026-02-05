import type { Metadata } from "next";
import localFonts from "next/font/local";



const latoFont = localFonts({
  src: [
    { path: '../public/fonts/Lato/Lato-Thin.ttf', weight: '100' },
    { path: '../public/fonts/Lato/Lato-Light.ttf', weight: '300' },
    { path: '../public/fonts/Lato/Lato-Regular.ttf', weight: '400' },
    { path: '../public/fonts/Lato/Lato-Bold.ttf', weight: '700' },
    { path: '../public/fonts/Lato/Lato-Black.ttf', weight: '900' },
  ],
  variable: '--font-lato',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${latoFont.variable}`}>
        {children}
      </body>
    </html>
  );
}

