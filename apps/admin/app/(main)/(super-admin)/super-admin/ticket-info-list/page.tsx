import { Skeleton } from "@ui/components/ui/skeleton";
import { HydrationBoundary, Suspense } from "@uket/api";
import TicketTableSection from "./_components/ticket-table-section";

const LoadingFallback = () => (
  <div className="flex h-full flex-col gap-3">
    <Skeleton className="w-full h-[800px]" />
  </div>
);

export default async function Page() {
  return (
    <HydrationBoundary>
      <main className="flex h-full flex-col grow gap-5 pl-16 pr-20 pt-20">
        <header className="flex items-center justify-between">
          <h1 className="text-[34px] font-bold">티켓 정보 목록</h1>
        </header>

        <Suspense fallback={<LoadingFallback />}>
          <TicketTableSection />
        </Suspense>
      </main>
    </HydrationBoundary>
  );
}
