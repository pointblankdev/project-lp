import { demos } from '#/lib/demos';
import Link from 'next/link';
import { StatsigPageViewTracker } from './StatsigProvider';

export default function Page() {
  return (
    <div className="space-y-8">
      hi
      <StatsigPageViewTracker />
    </div>
  );
}
