import Editor from '@monaco-editor/react';

interface EditorPanelProps {
  value: string;
  onChange: (val: string) => void;
}

export function EditorPanel({ value, onChange }: Readonly<EditorPanelProps>) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-800/50 bg-gray-950/50">
      <div className="relative flex-1 overflow-hidden">
        <Editor
          height="100%"
          defaultLanguage="yaml"
          theme="vs-dark"
          value={value}
          onChange={(val) => onChange(val || '')}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: '"JetBrains Mono", "Fira Code", "Fira Mono", monospace',
            scrollBeyondLastLine: false,
            padding: { top: 16, bottom: 16 },
            lineNumbers: 'on',
            renderLineHighlight: 'all',
            automaticLayout: true
          }}
        />
      </div>
    </div>
  );
}
