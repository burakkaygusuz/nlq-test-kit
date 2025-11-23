import { Button, Card, Tab, Tabs } from '@heroui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Database, FileJson, Trash2 } from 'lucide-react';
import { EditorPanel } from './EditorPanel';

interface ConfigurationPanelProps {
  schemaToon: string;
  setSchemaToon: (value: string) => void;
  testsToon: string;
  setTestsToon: (value: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function ConfigurationPanel({
  schemaToon,
  setSchemaToon,
  testsToon,
  setTestsToon,
  activeTab,
  setActiveTab
}: Readonly<ConfigurationPanelProps>) {
  const handleClearContent = () => {
    if (activeTab === 'schema') {
      setSchemaToon('');
    } else {
      setTestsToon('');
    }
  };

  return (
    <Card className="flex-1 overflow-hidden rounded-3xl border border-gray-800 bg-gray-900/30 shadow-2xl">
      <div className="flex items-center justify-between border-b border-gray-800 px-4 pt-4 pb-2">
        <Tabs
          aria-label="Configuration"
          color="primary"
          variant="light"
          selectedKey={activeTab}
          onSelectionChange={(key) => setActiveTab(key as string)}
          classNames={{
            tabList: 'w-full p-1 bg-gray-900/50 border border-gray-800 rounded-lg gap-2',
            cursor: 'w-full bg-blue-600/20 border border-blue-500/50 shadow-sm rounded-md',
            tab: 'h-10 px-4 rounded-md transition-all',
            tabContent: 'text-gray-400 group-data-[selected=true]:text-blue-400 font-medium'
          }}
        >
          <Tab
            key="schema"
            title={
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4" />
                <span>Schema (TOON)</span>
              </div>
            }
          />
          <Tab
            key="tests"
            title={
              <div className="flex items-center gap-2">
                <FileJson className="h-4 w-4" />
                <span>Test Cases (TOON)</span>
              </div>
            }
          />
        </Tabs>

        <Button
          isIconOnly
          size="sm"
          variant="light"
          onPress={handleClearContent}
          className="text-red-500 transition-colors hover:bg-red-500/10 hover:text-red-400"
          aria-label="Clear content"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>

      <div className="relative h-full flex-1 p-4 pt-2">
        <AnimatePresence mode="wait">
          {activeTab === 'schema' ? (
            <motion.div
              key="schema"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 p-4 pt-2"
            >
              <EditorPanel value={schemaToon} onChange={setSchemaToon} />
            </motion.div>
          ) : (
            <motion.div
              key="tests"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 p-4 pt-2"
            >
              <EditorPanel value={testsToon} onChange={setTestsToon} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  );
}
