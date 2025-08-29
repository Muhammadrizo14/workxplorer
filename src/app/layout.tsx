import type {Metadata} from "next";
import "./globals.css";
import {Roboto} from 'next/font/google';
import {NextIntlClientProvider} from 'next-intl';
import {ThemeProvider} from "next-themes";
import {Toaster} from "sonner";

const roboto = Roboto({
  weight: ['300', '400', '500', '600'],
});

export const metadata: Metadata = {
  title: "Тестовое задания на компанию WORKXPLORER",
  description: "Комплексная платформа профориентации, которая помогает студентам и профессионалам принимать обоснованные решения о своей будущей карьере с помощью продвинутой оценки и персонализированных рекомендаций.",
};

export default async function RootLayout({
                                           children,
                                         }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={roboto.className} suppressHydrationWarning>
      <body className="antialiased bg-gray-100 dark:bg-[#1c1c1c]" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider>
            <Toaster richColors position="top-right" />
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
