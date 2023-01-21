// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import Statsig from 'statsig-node';
import { EdgeConfigDataAdapter } from 'statsig-node-vercel';
import { getStatsigEnv } from './lib/getStatsigEnv';

const UID_COOKIE = 'uid';
// This is the experiment that will be used to determine the bucket
const EXPERIMENT = 'redirect';

// We'll use this to validate a random UUID
const IS_UUID = /^[0-9a-f-]+$/i;
const dataAdapter = new EdgeConfigDataAdapter(
  process.env.EDGE_CONFIG_ITEM_KEY!,
);

export const config = {
  matcher: ['/'],
};

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  // Get the user ID from the cookie or get a new one
  let userId = req.cookies.get(UID_COOKIE)?.value;
  let hasUserId = !!userId;

  // If there's no active user ID in cookies or its value is invalid, get a new one
  if (!userId || !IS_UUID.test(userId)) {
    userId = crypto.randomUUID();
    hasUserId = false;
  }

  await Statsig.initialize(process.env.STATSIG_SERVER_API_KEY!, {
    dataAdapter: getStatsigEnv() !== 'development' ? dataAdapter : null, // bug workaround
    environment: { tier: getStatsigEnv() },
  });

  const values = Statsig.getClientInitializeResponse({ userID: userId })!;

  const experiment = await Statsig.getExperiment(
    { userID: userId },
    EXPERIMENT,
  );

  console.log(experiment);
  // Clone the URL and change its pathname to point to a bucket
  const url = req.nextUrl.clone();

  url.pathname = String(experiment.value.path);

  // Response that'll rewrite to the selected bucket
  const res = NextResponse.rewrite(url);

  // Add the user ID to the response cookies if it's not there or if its value was invalid
  if (!hasUserId) {
    res.cookies.set(UID_COOKIE, userId, {
      maxAge: 60 * 60 * 24, // identify users for 24 hours
    });
    res.cookies.set('sscfg', JSON.stringify(values), {
      maxAge: 60 * 60 * 24, // store config for 24 hours
    });
  }

  await Statsig.flush();

  return res;
}
