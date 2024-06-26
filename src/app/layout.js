import './globals.css';
import Navbar from '@/components/Common/navbar/Navbar';
import Footer from '@/components/Common/footer/Footer';
import { Inter as FontSans } from 'next/font/google';
import { cn } from '@/common/libs/cn';
import { ThemeProvider } from '@/components/Common/themeProvider/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import SpotifyComponent from '@/components/spotifyComponent';

export const fontSans = FontSans({
    subsets: ['latin'],
    variable: '--font-sans',
});

export const metadata = {
    title: {
        default: 'Minh Tran',
        template: '%s | Minh Tran',
    },
    description: {
        default:
            "Welcome to Minh Tran's personal website. Explore insights on software engineering, data engineer, and more.",
        template: '%s | Minh Tran',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body
                className={cn(
                    'min-h-screen bg-background antialiased font-sans',
                    fontSans.variable
                )}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Navbar />
                    <div className="dark:text-white text-black">
                        {children}
                        <SpeedInsights />
                        <Analytics />
                    </div>
                    <SpotifyComponent />
                    <Footer />
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    );
}
