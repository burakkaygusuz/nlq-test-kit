'use client';

import { DEFAULT_SCHEMA, DEFAULT_TESTS } from '@/constants/defaults';
import { useTestRunner } from '@/hooks/useTestRunner';
import { encode as encodeTOON } from '@toon-format/toon';
import { useState } from 'react';
import { ConfigurationPanel } from './dashboard/ConfigurationPanel';
import { DashboardHeader } from './dashboard/DashboardHeader';
import { ResultsPanel } from './dashboard/ResultsPanel';

export default function Dashboard() {
  const [schemaToon, setSchemaToon] = useState(() => {
    try {
      return encodeTOON(DEFAULT_SCHEMA);
    } catch {
      return '';
    }
  });
  const [testsToon, setTestsToon] = useState(() => {
    try {
      return encodeTOON(DEFAULT_TESTS);
    } catch {
      return '';
    }
  });

  const [activeTab, setActiveTab] = useState<string>('schema');
  const { results, validationErrors, isPending, runTests } = useTestRunner();

  const handleRunTests = () => {
    runTests(schemaToon, testsToon);
  };

  const passCount = results.filter((r) => r.passed).length;
  const totalTests = results.length;
  const passRate = totalTests > 0 ? Math.round((passCount / totalTests) * 100) : 0;

  return (
    <div className="min-h-screen bg-black font-sans text-gray-100 selection:bg-blue-500/30">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-blue-900/20 via-gray-900/0 to-black" />

      <DashboardHeader
        totalTests={totalTests}
        passRate={passRate}
        isPending={isPending}
        onRunTests={handleRunTests}
      />

      <main className="mx-auto h-[calc(100vh-64px)] max-w-[1600px] p-6">
        <div className="grid h-full grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="flex h-full flex-col gap-6 lg:col-span-5">
            <ConfigurationPanel
              schemaToon={schemaToon}
              setSchemaToon={setSchemaToon}
              testsToon={testsToon}
              setTestsToon={setTestsToon}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>

          <div className="lg:col-span-7">
            <ResultsPanel
              results={results}
              validationErrors={validationErrors}
              isPending={isPending}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
