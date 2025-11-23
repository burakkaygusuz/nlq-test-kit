import type { TestResult, ValidationError } from '@/types';
import { Card, CardHeader, ScrollShadow } from '@heroui/react';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { AlertCircle, CheckCircle2, LayoutDashboard, XCircle } from 'lucide-react';
import { useMemo } from 'react';
import { EmptyState } from './EmptyState';
import { ErrorDisplay } from './ErrorDisplay';
import { StatCard } from './StatCard';
import { TestResultItem } from './TestResultItem';

interface ResultsPanelProps {
  results: TestResult[];
  validationErrors: ValidationError[];
  isPending: boolean;
}

const containerVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 }
};

export function ResultsPanel({
  results,
  validationErrors,
  isPending
}: Readonly<ResultsPanelProps>) {
  const stats = useMemo(
    () => ({
      passCount: results.filter((r) => r.passed).length,
      failCount: results.filter((r) => !r.passed && !r.error).length,
      errorCount: results.filter((r) => r.error).length
    }),
    [results]
  );

  const showEmptyState = results.length === 0 && !isPending && validationErrors.length === 0;
  const showResults = results.length > 0;

  return (
    <div className="flex h-full flex-col gap-6 overflow-hidden">
      <AnimatePresence>
        <ErrorDisplay errors={validationErrors} />
      </AnimatePresence>

      {showEmptyState && <EmptyState />}

      {showResults && (
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className={`flex h-full flex-col gap-6 transition-opacity duration-300 ${isPending ? 'opacity-50' : 'opacity-100'}`}
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <StatCard title="Passed" value={stats.passCount} icon={CheckCircle2} color="emerald" />
            <StatCard title="Failed" value={stats.failCount} icon={XCircle} color="red" />
            <StatCard title="Errors" value={stats.errorCount} icon={AlertCircle} color="amber" />
          </div>

          <Card className="flex flex-1 flex-col overflow-hidden rounded-3xl border border-gray-800 bg-gray-900/30 shadow-2xl">
            <CardHeader className="flex items-center justify-between border-b border-gray-800 bg-gray-900/50 px-6 py-4">
              <h3 className="flex items-center gap-2 font-semibold text-gray-200">
                <LayoutDashboard className="h-4 w-4 text-blue-400" />
                Test Results
              </h3>
            </CardHeader>
            <ScrollShadow className="flex-1 space-y-3 p-4">
              {results.map((result, idx) => (
                <TestResultItem key={result.id} result={result} index={idx} />
              ))}
            </ScrollShadow>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
