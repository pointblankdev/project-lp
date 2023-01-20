'use client';

import React, { useEffect } from 'react';
import { Statsig, StatsigProvider } from 'statsig-react';
import { getStatsigEnv } from '#/lib/getStatsigEnv';
import Cookies from 'js-cookie';

export function StatsigProviderSSR({
  children,
}: {
  children: React.ReactNode;
}) {
  // middleware will automatically set a cookie for the user if they visit a page
  const userID = Cookies.get('uid');
  return (
    <StatsigProvider
      sdkKey={process.env.NEXT_PUBLIC_STATSIG_CLIENT_KEY!}
      waitForInitialization={true}
      user={{ userID }}
      options={{ environment: { tier: getStatsigEnv() } }}
    >
      {children}
    </StatsigProvider>
  );
}

export function StatsigPageView() {
  useEffect(() => {
    Statsig.logEvent('Page View', '/');
  }, []);
  return <></>;
}
