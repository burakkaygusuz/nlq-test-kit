import { Card, CardBody } from '@heroui/react';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color: string;
  subtext?: string;
}

export function StatCard({ title, value, icon: Icon, color, subtext }: Readonly<StatCardProps>) {
  return (
    <Card className="rounded-2xl border border-gray-800 bg-gray-900/50 shadow-lg backdrop-blur-md">
      <CardBody className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-sm font-medium text-gray-400">{title}</p>
          <div className={`rounded-lg p-2 bg-${color}-500/10`}>
            <Icon className={`h-4 w-4 text-${color}-500`} />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <h3 className="text-2xl font-bold text-white">{value}</h3>
          {subtext && <span className="text-xs text-gray-500">{subtext}</span>}
        </div>
      </CardBody>
    </Card>
  );
}
