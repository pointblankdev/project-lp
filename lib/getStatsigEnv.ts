export function getStatsigEnv() {
  const vercelEnv =
    process.env.VERCEL_ENV || process.env.NEXT_PUBLIC_VERCEL_ENV;
  let tier;
  if (vercelEnv === 'production') {
    tier = 'production';
  } else if (vercelEnv === 'preview') {
    tier = 'staging';
  } else {
    tier = 'development';
  }
  return tier;
}
