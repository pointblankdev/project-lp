'use client';

import React, { useEffect } from 'react';
import { Statsig, StatsigSynchronousProvider } from 'statsig-react';
import { getStatsigEnv } from '#/lib/getStatsigEnv';

export function StatsigProviderSSR({
  children,
  sscfg,
  userID,
}: {
  children: React.ReactNode;
  sscfg: Record<string, any>;
  userID: string;
}) {
  return (
    <StatsigSynchronousProvider
      sdkKey={process.env.NEXT_PUBLIC_STATSIG_CLIENT_KEY!}
      initializeValues={sscfg}
      user={{ userID }}
      options={{ environment: { tier: getStatsigEnv() } }}
    >
      {children}
    </StatsigSynchronousProvider>
  );
}

export const StatsigPageViewTracker = () => {
  useEffect(() => {
    Statsig.logEvent('Page View', window.location.pathname);
  }, []);
  return <></>;
};
