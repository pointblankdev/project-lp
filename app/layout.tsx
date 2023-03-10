import '#/styles/globals.css';
import { VercelLogo } from '#/ui/VercelLogo';
import { cookies } from 'next/headers';
import ClearbitVisitorReport from './ClearbitVisitorReport';
import { StatsigProviderSSR } from './StatsigProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // middleware will automatically set a cookie for the user if they visit a page
  const sscfg = JSON.parse(cookies().get('sscfg')?.value || '{}');
  const userID = cookies().get('uid')?.value || '';

  return (
    <html lang="en" className="[color-scheme:dark]">
      <head />
      <body className="overflow-y-scroll bg-gray-1100 bg-[url('/grid.svg')]">
        <StatsigProviderSSR sscfg={sscfg} userID={userID}>
          {children}
        </StatsigProviderSSR>
        <ClearbitVisitorReport />
      </body>
    </html>
  );
}

function Byline() {
  return (
    <div className="flex items-center justify-between gap-x-4 p-3.5 lg:px-5 lg:py-3">
      <div className="flex items-center gap-x-1.5">
        <div className="text-sm text-gray-400">By</div>
        <a href="https://vercel.com" title="Vercel">
          <div className="w-16 text-gray-100 hover:text-gray-50">
            <VercelLogo />
          </div>
        </a>
      </div>

      <div className="text-sm text-gray-400">
        <a
          className="underline decoration-dotted underline-offset-4 hover:text-gray-400"
          href="https://github.com/vercel/app-playground"
          target="_blank"
          rel="noreferrer"
        >
          View code
        </a>
        {' or '}
        <a
          className="underline decoration-dotted underline-offset-4 hover:text-gray-400"
          href="https://vercel.com/templates/next.js/app-directory"
          target="_blank"
          rel="noreferrer"
        >
          deploy your own
        </a>
      </div>
    </div>
  );
}
