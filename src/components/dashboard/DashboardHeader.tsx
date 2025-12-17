import { Button } from '@heroui/react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import Image from 'next/image';

interface DashboardHeaderProps {
  totalTests: number;
  passRate: number;
  isPending: boolean;
  onRunTests: () => void;
}

function getPassRateColor(rate: number): string {
  if (rate >= 80) return 'text-emerald-400';
  if (rate >= 50) return 'text-yellow-400';
  return 'text-red-400';
}

export function DashboardHeader({
  totalTests,
  passRate,
  isPending,
  onRunTests
}: Readonly<DashboardHeaderProps>) {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-800 bg-black/50 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10">
            <Image
              src="/logo.png"
              alt="NLQ Test Kit Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white">NLQ Test Kit</h1>
            <p className="text-xs font-medium text-gray-500">Natural Language Query Testing</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {totalTests > 0 && (
            <div className="mr-4 hidden items-center gap-6 md:flex">
              <div className="flex flex-col items-center justify-center">
                <span className="text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Pass Rate
                </span>
                <span className={`text-sm font-bold ${getPassRateColor(passRate)}`}>
                  {passRate}%
                </span>
              </div>
              <div className="h-8 w-px bg-gray-800" />
              <div className="flex flex-col items-center justify-center">
                <span className="text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Total
                </span>
                <span className="text-sm font-bold text-white">{totalTests}</span>
              </div>
            </div>
          )}

          <Button
            onPress={onRunTests}
            isDisabled={isPending}
            variant="bordered"
            radius="full"
            className="min-w-[140px] border border-blue-500/30 bg-blue-600/20 font-semibold text-blue-500 transition-all hover:bg-blue-600/30"
            size="md"
          >
            <div className="flex w-full items-center justify-center gap-2">
              {isPending ? (
                <motion.div
                  className="h-5 w-5 rounded-full border-2 border-current border-t-transparent"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    ease: 'linear',
                    repeat: Infinity
                  }}
                />
              ) : (
                <>
                  <Play className="h-4 w-4 fill-current" />
                  <span>Run Tests</span>
                </>
              )}
            </div>
          </Button>
        </div>
      </div>
    </header>
  );
}
