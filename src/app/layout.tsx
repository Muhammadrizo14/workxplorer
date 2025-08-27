import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  weight: ['300', '400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
});


export const metadata: Metadata = {
  title: "Тестовое задания на компанию WORKXPLORER",
  description: "Комплексная платформа профориентации, которая помогает студентам и профессионалам принимать обоснованные решения о своей будущей карьере с помощью продвинутой оценки и персонализированных рекомендаций.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={poppins.className}>
      <body className="antialiased bg-gray-100">
        {children}
      </body>
    </html>
  );
}
