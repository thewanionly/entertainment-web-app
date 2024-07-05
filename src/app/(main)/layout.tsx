import { Header } from '@/components/app-specific/Header';
import '@/styles/globals.css';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-limit lg:mx-auto lg:flex lg:flex-col lg:pl-8">
      <Header />
      <main className="min-h-[85dvh] w-full pb-6 sm:pb-8 lg:min-w-0 lg:pl-[96px]">{children}</main>
    </div>
  );
}
