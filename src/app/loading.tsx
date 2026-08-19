import { Loader } from '@/components/ui/Loader';

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen w-full bg-paper">
      <div className="flex flex-col items-center gap-4">
        <Loader size={64} />
        <p className="text-ink-soft animate-pulse">Loading...</p>
      </div>
    </div>
  );
}
