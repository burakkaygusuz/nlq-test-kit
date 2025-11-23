import { Terminal } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center rounded-3xl border-2 border-dashed border-gray-800 bg-gray-900/20 text-gray-500">
      <div className="mb-6 rounded-full bg-gray-900/50 p-6 ring-1 ring-gray-800">
        <Terminal className="h-12 w-12 text-gray-600" />
      </div>
      <h3 className="mb-2 text-xl font-semibold text-gray-300">Ready to Test</h3>
      <p className="max-w-xs text-center text-sm text-gray-500">
        Configure your schema and test cases on the left, then click &quot;Run Tests&quot; to see
        the magic happen.
      </p>
    </div>
  );
}
