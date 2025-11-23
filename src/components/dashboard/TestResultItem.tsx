import type { TestResult } from '@/types';
import { setsEqual } from '@/utils/toon-parser';
import { Chip } from '@heroui/react';
import { motion, type Variants } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';

interface TestResultItemProps {
  result: TestResult;
  index: number;
}

const itemVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

export function TestResultItem({ result, index }: Readonly<TestResultItemProps>) {
  return (
    <motion.div
      variants={itemVariants}
      initial="initial"
      animate="animate"
      transition={{ delay: index * 0.05 }}
    >
      <div
        className={`group rounded-2xl border transition-all duration-200 ${
          result.passed
            ? 'border-emerald-900/30 bg-emerald-950/10 hover:border-emerald-800/50'
            : 'border-red-900/30 bg-red-950/10 hover:border-red-800/50'
        }`}
      >
        <div className="p-4">
          <div className="mb-3 flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div
                className={`mt-1 rounded-full p-1.5 ${
                  result.passed
                    ? 'bg-emerald-500/10 text-emerald-500'
                    : 'bg-red-500/10 text-red-500'
                }`}
              >
                {result.passed ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <XCircle className="h-4 w-4" />
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-200">{result.question}</p>
                {!result.passed && result.error && (
                  <p className="mt-1 font-mono text-xs text-red-400">{result.error}</p>
                )}
              </div>
            </div>
            <Chip
              size="sm"
              variant="flat"
              color={result.passed ? 'success' : 'danger'}
              className="text-[10px] font-bold tracking-wider uppercase"
            >
              {result.passed ? 'Pass' : 'Fail'}
            </Chip>
          </div>

          <div className="grid grid-cols-2 gap-4 pl-10">
            <div className="space-y-1">
              <span className="text-[10px] font-semibold tracking-wider text-gray-500 uppercase">
                Expected
              </span>
              <div className="rounded-lg border border-gray-800/50 bg-black/40 p-2">
                <code className="block overflow-hidden font-mono text-xs text-ellipsis whitespace-nowrap text-gray-400">
                  Dims: {JSON.stringify(result.expected.dimensions)}
                </code>
                <code className="block overflow-hidden font-mono text-xs text-ellipsis whitespace-nowrap text-gray-400">
                  Mets: {JSON.stringify(result.expected.metrics)}
                </code>
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-semibold tracking-wider text-gray-500 uppercase">
                Actual
              </span>
              <div
                className={`rounded-lg border bg-black/40 p-2 ${
                  result.passed ? 'border-emerald-900/30' : 'border-red-900/30'
                }`}
              >
                {result.actual ? (
                  <>
                    <code
                      className={`block overflow-hidden font-mono text-xs text-ellipsis whitespace-nowrap ${
                        setsEqual(
                          new Set(result.actual.dimensions),
                          new Set(result.expected.dimensions)
                        )
                          ? 'text-emerald-400'
                          : 'text-red-400'
                      }`}
                    >
                      Dims: {JSON.stringify(result.actual.dimensions)}
                    </code>
                    <code
                      className={`block overflow-hidden font-mono text-xs text-ellipsis whitespace-nowrap ${
                        setsEqual(new Set(result.actual.metrics), new Set(result.expected.metrics))
                          ? 'text-emerald-400'
                          : 'text-red-400'
                      }`}
                    >
                      Mets: {JSON.stringify(result.actual.metrics)}
                    </code>
                  </>
                ) : (
                  <span className="text-xs text-gray-600 italic">No data</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
